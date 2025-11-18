import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiClassificationRequest, GeminiClassificationResponse } from '@/types';
import { getCachedClassification, cacheClassification } from './redis';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function classifyTask(
  request: GeminiClassificationRequest
): Promise<GeminiClassificationResponse> {
  // Check cache first
  const cacheKey = `${request.taskTitle}-${request.taskDescription || ''}`;
  const cached = await getCachedClassification(cacheKey);
  if (cached) {
    return cached;
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = buildClassificationPrompt(request);

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON response from Gemini
    const parsed = parseGeminiResponse(text);

    // Validate the bucketId exists
    const validBucket = request.buckets.find((b) => b.id === parsed.bucketId);
    if (!validBucket) {
      throw new Error('Invalid bucket ID returned by AI');
    }

    // Cache the result
    await cacheClassification(cacheKey, {
      bucketId: parsed.bucketId,
      confidence: parsed.confidence,
    });

    return parsed;
  } catch (error) {
    console.error('Gemini classification error:', error);
    throw new Error('Failed to classify task with AI');
  }
}

function buildClassificationPrompt(request: GeminiClassificationRequest): string {
  const bucketsDescription = request.buckets
    .map(
      (bucket) =>
        `ID: ${bucket.id}\nName: ${bucket.name}\nDescription: ${
          bucket.description || 'N/A'
        }\nKeywords: ${bucket.keywords.join(', ')}\n`
    )
    .join('\n');

  return `You are a task classification AI for Calcif.ai, a brutalist task management system.

Your job is to classify the following task into ONE of the available buckets based on the task content and bucket definitions.

Task Title: "${request.taskTitle}"
Task Description: "${request.taskDescription || 'No description provided'}"

Available Buckets:
${bucketsDescription}

Instructions:
1. Analyze the task title and description
2. Match it to the MOST RELEVANT bucket based on keywords, description, and semantic meaning
3. Provide a confidence score from 0.0 to 1.0 (where 1.0 is absolute certainty)
4. Provide brief reasoning for your classification

Respond ONLY with valid JSON in this exact format:
{
  "bucketId": "<the exact bucket ID from the list above>",
  "confidence": <number between 0.0 and 1.0>,
  "reasoning": "<brief explanation of why this bucket was chosen>"
}

Do not include any additional text, markdown formatting, or explanations outside the JSON object.`;
}

function parseGeminiResponse(text: string): GeminiClassificationResponse {
  // Remove markdown code blocks if present
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/```\n?/g, '');
  }

  try {
    const parsed = JSON.parse(cleaned);
    
    // Validate required fields
    if (!parsed.bucketId || typeof parsed.confidence !== 'number') {
      throw new Error('Invalid response structure');
    }

    // Ensure confidence is between 0 and 1
    parsed.confidence = Math.max(0, Math.min(1, parsed.confidence));

    return parsed;
  } catch (error) {
    console.error('Failed to parse Gemini response:', text);
    throw new Error('Invalid JSON response from AI');
  }
}

export const CONFIDENCE_THRESHOLD = 0.6;

export function shouldAutoClassify(confidence: number): boolean {
  return confidence >= CONFIDENCE_THRESHOLD;
}

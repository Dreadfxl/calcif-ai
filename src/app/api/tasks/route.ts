import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { classifyTask, shouldAutoClassify } from '@/lib/gemini';
import { getServerSession } from 'next-auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const tasks = await prisma.task.findMany({
      where: { userId: user.id },
      include: { bucket: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { title, description } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Fetch user's buckets for classification
    const buckets = await prisma.bucket.findMany({
      where: { userId: user.id },
    });

    let bucketId: string | undefined;
    let confidence: number | undefined;
    let classificationStatus: 'pending' | 'classified' | 'manual' = 'pending';

    // Attempt AI classification if buckets exist
    if (buckets.length > 0) {
      try {
        const classificationResult = await classifyTask({
          taskTitle: title,
          taskDescription: description,
          buckets: buckets.map((b) => ({
            id: b.id,
            name: b.name,
            description: b.description || undefined,
            keywords: b.keywords,
          })),
        });

        confidence = classificationResult.confidence;

        if (shouldAutoClassify(confidence)) {
          bucketId = classificationResult.bucketId;
          classificationStatus = 'classified';
        }
      } catch (error) {
        console.error('Classification failed:', error);
        // Continue creating task without classification
      }
    }

    // Create task
    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: user.id,
        bucketId,
        confidence,
        classificationStatus,
      },
      include: { bucket: true },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const models = [
      {
        provider: 'Gemini',
        models: [
          {
            modelKey: 'gemini-2.5-flash-preview-05-20',
            modelName: 'Gemini 2.5 Flash Preview',
          },
          {
            modelKey: 'gemini-2.5-pro-preview-06-05',
            modelName: 'Gemini 2.5 Pro Preview',
          },
        ],
      },
    ];

    return NextResponse.json(models);
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    );
  }
}
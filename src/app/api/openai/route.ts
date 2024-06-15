import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import axios, { AxiosResponse } from 'axios';

type OpenAIChoicesResponse = {
  message: MessageProps;
};

type OpenAIResponse = {
  choices: OpenAIChoicesResponse[];
};

export type MessageProps = {
  role: string;
  content: string;
};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const { chatSessionId, content } = await request.json();


    
    let chatSession: any;
    if (!chatSessionId) {
      console.log(content)
      chatSession = await prisma.chatSession.create({
        data: {
          name: content,
          mood: "neutral"
        },
      });
    } else {
      chatSession = await prisma.chatSession.findFirst({
        where: { id: chatSessionId },
        include: { messages: true },
      });
    }

    console.log('Before new Message')

    const newMessages: any = [...(chatSession?.messages ?? [])];
    newMessages.push({
      role: 'user',
      content,
      chatSessionId: chatSession.id,
    });

    console.log('TEST');

    // AI Processing
    const response: AxiosResponse<OpenAIResponse> = await axios.post(
      // `${process.env.OPENAI_API_URL}/completions`,
      `https://api.openai.com/v1/chat/completions`,
      {
        messages: newMessages,
        model: 'gpt-3.5-turbo',
        stream: false, // So it come in complete form not word by word
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response)

    const data = response.data;
    newMessages.push({
      ...data.choices[0].message,
      chatSessionId: chatSession.id,
    });

    await prisma.message.createMany({
      data: newMessages,
    });

    return NextResponse.json(
      {
        message: 'Success',
        data: newMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Internal Server Error',
        error,
      },
      { status: 500 }
    );
  }
}

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

    const newMessages: any = [...(chatSession?.messages ?? [])];
    newMessages.push({
      role: 'user',
      content,
      chatSessionId: chatSession.id,
    });


    const response: AxiosResponse<OpenAIResponse> = await axios.post(
      `${process.env.OPENAI_API_URL}/completions`,
      {
        messages: [
          {
            role: "user",
            content: "Write all of the content with html tagging that could be inserted to html tag using innerHTML to differentiate bulleted list, heading, paragraph. Important, respond the message that is appended after this chat by following the rules earlier"
          },
          ...newMessages
        ],
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

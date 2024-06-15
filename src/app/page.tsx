'use client';
import { ResizablePanelGroup, ResizablePanel } from '@/components/ui/resizable';
import SidebarComponent from '@/components/base/sidebarComponent';
import prisma from '@/lib/db';
import { Button } from '@/components/ui/button';

import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { MessageProps } from './api/openai/route';
import axiosInstance from '@/lib/axiosInstance';

/// Page
export default function Home() {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  // OpenAI API
  type createMessageProps = {
    content: string;
  };
  const createMessage = async ({ content }: createMessageProps) => {
    const response = await axiosInstance.post('/openai', {
      content,
    });
  };

  // TODO: Bug Fixing useQuery error
  // const { isFetching, data, error, refetch } = useQuery({
  //   queryKey: ["chat-session"],
  //   queryFn: async () => {
  //     return prisma.chatSession.findMany();
  //   },
  // });
  const { isFetching, data, error, refetch } = useQuery({
    queryKey: ['chat-session'],
    queryFn: async () => {
      const response = await fetch('/api/chat-sessions');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  // fetch specific message from the chat session
  // const {
  //   isFetching: isFetchingMessage,
  //   data: messageData,
  //   error: messageError,
  //   refetch: messageRefetch,
  // } = useQuery({
  //   queryKey: ['chat-session', 'message'],
  //   queryFn: async () => {
  //     return prisma.chatSession.findFirst({
  //       where: {
  //         messages: {
  //           some: {
  //             id: '1',
  //           },
  //         },
  //       },
  //     });
  //   },
  // });

  //fetch data from chat-session message

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={14}>
        <SidebarComponent />
      </ResizablePanel>
      <ResizablePanel defaultSize={86}>
        <main className="flex min-h-screen flex-col items-center  p-24 bg-gray-100">
          <h1>Hello</h1>
          <Button
            onClick={() =>
              createMessage({
                content: 'Hello',
              })
            }
          >
            Hello
          </Button>
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

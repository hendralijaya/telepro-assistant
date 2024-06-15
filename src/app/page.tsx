"use client";
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import SidebarComponent from "@/components/base/sidebarComponent";
import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { FormEvent, useState } from "react";
import { MessageProps } from "./api/openai/route";
import axiosInstance from "@/lib/axiosInstance";
import ChatboxComponent from "@/components/module/chatboxComponent";
import { ChatSession } from "@prisma/client";

/// Page
export default function Home() {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const [selectedChatSession, setSelectedChatSession] =
    useState<ChatSession | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  // OpenAI API
  type CreateMessageProps = {
    content: string;
  };
  const createMessage = async ({ content }: CreateMessageProps) => {
    const response = await axiosInstance.post("/openai", {
      content,
    });
    console.log(response.data);

    setMessages(response.data);
    console.log(messages);
  };

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(form.entries()) as CreateMessageProps;
    console.log(data);
    createMessage(data);
  };

  // TODO: Bug Fixing useQuery error
  // const { isFetching, data, error, refetch } = useQuery({
  //   queryKey: ["chat-session"],
  //   queryFn: async () => {
  //     return prisma.chatSession.findMany();
  //   },
  // });
  const { isFetching, data, error, refetch } = useQuery({
    queryKey: ["chat-session"],
    queryFn: async () => {
      const response = await fetch("/api/chat-sessions");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  // fetch specific message from the chat session
  const {
    isFetching: isFetchingMessage,
    data: messageData,
    error: messageError,
    refetch: messageRefetch,
  } = useQuery({
    queryKey: ["chat-session", "message", selectedChatSession?.id], // Add selectedChatSession to queryKey
    queryFn: async () => {
      const response = await fetch(
        `/api/messages?id=${selectedChatSession?.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: shouldFetch,
  });

  //fetch data from chat-session message

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={14}>
        <SidebarComponent
          chatSessions={Array.isArray(data) ? data : []}
          onTileClick={(chatSession) => {
            setSelectedChatSession(chatSession);
            setShouldFetch(true);
          }}
        />
      </ResizablePanel>
      <ResizablePanel defaultSize={86}>
        <main className="flex h-[calc(100vh-5rem)] flex-col items-center p-16 bg-gray-100">
          <ResizablePanelGroup
            direction="vertical"
            className="w-full h-full"
          >
            <ResizablePanel
              defaultSize={92}
              maxSize={92}
              className="overflow-auto"
            >
              {messages.map((m, i) => (
                <ChatboxComponent
                  key={i}
                  isChatBot={m.role == "assistant"}
                >
                  {m.content}
                </ChatboxComponent>
              ))}
            </ResizablePanel>
            <ResizablePanel
              defaultSize={8}
              className="flex items-center"
            >
              <form
                onSubmit={formSubmitHandler}
                className="w-full flex items-center gap-2"
              >
                <div className="border-4 rounded-full w-full p-2">
                  <input
                    type="text"
                    className="border-none bg-transparent w-full"
                    placeholder="Type or message"
                  />
                </div>
                <button type="submit">
                  <PaperPlaneTilt
                    className="fill-blue-400"
                    weight={"bold"}
                  />
                </button>
              </form>
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

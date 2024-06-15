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
  const [messageState, setMessageState] = useState();

  type CreateMessageProps = {
    content: string;
  };
  const createMessage = async ({ content }: CreateMessageProps) => {
    const response = await axiosInstance.post("/openai", {
      content,
      chatSessionId: selectedChatSession?.id,
    });
    setMessages(response.data.data);
  };

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(form.entries()) as CreateMessageProps;

    createMessage(data);
  };

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
      setMessages(await response.json());
      return response.json();
    },
    enabled: shouldFetch,
  });

  //fetch data from chat-session message

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={14}>
        <SidebarComponent
          clearChatSessions={() => {
            setShouldFetch(false);
            setSelectedChatSession(null);
            setMessages([]);
          }}
          chatSessions={Array.isArray(data) ? data : []}
          onTileClick={(chatSession) => {
            setSelectedChatSession(chatSession);
            setShouldFetch(true);
          }}
        />
      </ResizablePanel>
      <ResizablePanel defaultSize={86}>
        <main className="flex h-[calc(100vh-5rem)] flex-col items-center  bg-gray-100">
          <div className="w-full h-full ">
            <div className="px-16 py-8 overflow-y-auto h-[80vh]">
              {messages.map((m, i) => (
                <ChatboxComponent
                  key={i}
                  isChatBot={m.role == "assistant"}
                >
                  {m.content}
                </ChatboxComponent>
              ))}
            </div>
            <div className="flex items-center px-16 pb-8">
              <form
                onSubmit={formSubmitHandler}
                className="w-full flex items-center gap-2"
              >
                <div className="border-4 rounded-full w-full p-2">
                  <input
                    type="text"
                    name="content"
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
            </div>
          </div>
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

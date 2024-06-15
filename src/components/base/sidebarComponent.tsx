'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

import { AddressBook, CalendarBlank, ChartBar, ChartBarHorizontal, FilmReel, InstagramLogo, MagnifyingGlass, MapTrifold, NotePencil, Plus, Users } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import SidebarTileComponent from './sidebarTileComponent';
import { useRouter, usePathname } from 'next/navigation';
import { ChatSession } from '@prisma/client';

interface SidebarTileProps {
  chatSessions: ChatSession[];
  onTileClick: (chatSession: ChatSession) => void;
  clearChatSessions: () => void;
  activeChatSession: ChatSession | null;
}

const SidebarComponent = (props: SidebarTileProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChatSessions, setFilteredChatSessions] = useState<ChatSession[]>(props.chatSessions);

  useEffect(() => {
    setFilteredChatSessions(props.chatSessions.filter((chatSession) => chatSession.name.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [searchQuery, props.chatSessions]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-y-6">
        <SidebarTileComponent
          key="new"
          onClick={() => {
            props.clearChatSessions();
          }}
        >
          <div className="flex px-4 gap-x-2 items-center">
            <NotePencil size={32} weight="bold" />
            New Chat
          </div>
        </SidebarTileComponent>
        <div className="flex border-black border rounded-full w-full items-center px-4">
          <MagnifyingGlass size={24} weight="bold" />
          <input type="text" placeholder="Search Chat" className="border-2 border-gray-300 rounded-md p-2 w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        {/* make a line  */}
        <div className="border-t-2 border-gray-300 w-full"></div>
      </div>
      <p className="font-semibold">Search History</p>
      <div className="flex flex-col overflow-y-auto gap-6 max-h-[50vh]">
        {filteredChatSessions.map((chatSession) => (
          <SidebarTileComponent
            key={chatSession.id}
            active={props.activeChatSession?.id === chatSession.id}
            onClick={() => {
              props.onTileClick(chatSession);
            }}
          >
            {chatSession.name}
          </SidebarTileComponent>
        ))}
      </div>
    </div>
  );
};
export default SidebarComponent;

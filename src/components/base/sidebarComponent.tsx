'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

import { AddressBook, CalendarBlank, ChartBar, ChartBarHorizontal, FilmReel, InstagramLogo, MapTrifold, Plus, Users } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import SidebarTileComponent from './sidebarTileComponent';
import { useRouter, usePathname } from 'next/navigation';
import { ChatSession } from '@prisma/client';

interface SidebarTileProps {
  chatSessions: ChatSession[];
  onTileClick: (chatSession: ChatSession) => void;
}

const SidebarComponent = (props: SidebarTileProps) => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <div className="flex flex-col gap-4 p-4">
      {props.chatSessions.map((chatSession) => (
        <SidebarTileComponent
          key={chatSession.id}
          onClick={() => {
            props.onTileClick(chatSession);
          }}
        >
          {chatSession.name}
        </SidebarTileComponent>
      ))}
    </div>
  );
};
export default SidebarComponent;

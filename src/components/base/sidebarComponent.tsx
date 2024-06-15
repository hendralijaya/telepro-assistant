"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import {
  AddressBook,
  CalendarBlank,
  ChartBar,
  ChartBarHorizontal,
  FilmReel,
  InstagramLogo,
  MapTrifold,
  Plus,
  Users,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import SidebarTileComponent from "./sidebarTileComponent";
import { HouseSimple } from "@phosphor-icons/react";
import { useRouter, usePathname } from "next/navigation";

const SidebarComponent = () => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <div className="flex flex-col gap-4 p-4">
      <SidebarTileComponent
        onClick={() => {
          router.push("/admin");
        }}
      >
        Samting
      </SidebarTileComponent>
    </div>
  );
};
export default SidebarComponent;

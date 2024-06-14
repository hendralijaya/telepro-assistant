import Image from "next/image";
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import SidebarComponent from "@/components/base/sidebarComponent";

export default function Home() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={14}>
        <SidebarComponent />
      </ResizablePanel>
      <ResizablePanel defaultSize={86}>
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
          <h1>Hello</h1>
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

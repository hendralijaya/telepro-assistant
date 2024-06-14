import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import HeadbarComponent from "./headbarComponent";
import SidebarComponent from "./sidebarComponent";

const ContainerComponent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="w-full h-full">
      <ResizablePanelGroup
        direction="vertical"
        className="rounded-lg w-full h-full !overflow-y-auto"
      >
        <ResizablePanel
          defaultSize={8}
          className="h-full overflow-auto"
        >
          <HeadbarComponent />
        </ResizablePanel>
        <ResizablePanel
          defaultSize={92}
          className="h-full overflow-auto"
        >
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={14}>
              <SidebarComponent />
            </ResizablePanel>
            <ResizablePanel defaultSize={86}>{children}</ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
};

export default ContainerComponent;

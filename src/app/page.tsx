import { ResizablePanelGroup, ResizablePanel } from '@/components/ui/resizable';
import SidebarComponent from '@/components/base/sidebarComponent';
import { useQuery } from '@tanstack/react-query';
import prisma from '@/db';

export default function Home() {
  const { isFetching, data, error, refetch } = useQuery({
    queryKey: ['chat-session'],
    queryFn: async () => {
      return prisma.chatSession.findMany();
    },
  });

  //fetch specific message from the chat session
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
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
          <h1>Hello</h1>
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

import { cn } from "@/lib/utils";
import { CopySimple, Robot } from "@phosphor-icons/react";

export default function ChatboxComponent({
  children,
  isChatBot = false,
}: Readonly<{
  children: React.ReactNode;
  isChatBot: boolean;
}>) {
  //TODO: Copy Text from Children
  const copyText = async () => {
    await navigator.clipboard.writeText("");
  };

  return (
    <section className="flex flex-col gap-2 w-[10rem]">
      <div
        onClick={copyText}
        className={cn({
          "rounded-tl-xl rounded-r-full": isChatBot,
          "rounded-l-full rounded tr-xl": !isChatBot,
          "border-4 p-2 grid grid-cols-[1fr_5fr]": true,
        })}
      >
        <Robot
          className={cn({
            hidden: !isChatBot,
          })}
        />
        <div>{children}</div>
      </div>
      <div className="flex">
        <CopySimple className="rounded-full bg-white p-1" />
      </div>
    </section>
  );
}

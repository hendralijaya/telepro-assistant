import { cn } from "@/lib/utils";
import { CopySimple, Robot } from "@phosphor-icons/react";

export default function ChatboxComponent({
  children,
  isChatBot,
}: Readonly<{
  children: React.ReactNode;
  isChatBot: boolean;
}>) {
  //TODO: Copy Text from Children
  const copyText = async () => {
    await navigator.clipboard.writeText("");
  };

  return (
    <section
      className={cn({
        "flex w-full": true,
        "justify-end": !isChatBot,
      })}
    >
      <div className="flex flex-col gap-2 w-[30%]">
        <div
          onClick={copyText}
          className={cn({
            "rounded-tl-xl rounded-r-2xl grid-cols-[1fr_5fr]": isChatBot,
            "rounded-l-2xl rounded tr-xl": !isChatBot,
            "border-4 p-2 grid": true,
          })}
        >
          <Robot
            className={cn({
              "w-full": true,
              hidden: !isChatBot,
            })}
          />
          <div dangerouslySetInnerHTML={{ __html: children as string }} />
        </div>
        <div className="flex">
          <CopySimple
            className="rounded-full bg-white p-1"
            size={25}
          />
        </div>
      </div>
    </section>
  );
}

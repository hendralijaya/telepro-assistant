import { MouseEventHandler } from "react";

export default function SidebarTileComponent({
  children,
  onClick,
}: Readonly<{
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}>) {
  return (
    <button
      onClick={onClick}
      className="button px-4"
    >
      <div className="truncate">{children}</div>
    </button>
  );
}

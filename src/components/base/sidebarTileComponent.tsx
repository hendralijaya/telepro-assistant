import { MouseEventHandler, ReactNode } from 'react';

interface SidebarTileComponentProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
}

export default function SidebarTileComponent({ children, onClick, active }: SidebarTileComponentProps) {
  return (
    <button onClick={onClick} className={`button px-4 py-2 ${active ? 'bg-slate-500 text-white' : 'bg-white text-black'}`}>
      <div className="truncate">{children}</div>
    </button>
  );
}

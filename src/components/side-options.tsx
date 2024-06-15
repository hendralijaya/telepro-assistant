import { Translate } from '@phosphor-icons/react';
import { Settings, User } from 'lucide-react';

export default function SideOptions() {
  return (
    <>
      <div className="relative w-96 h-24">
        <div className="flex flex-row items-center justify-center rounded-full w-80 h-20 bg-gradient-to-r from-pertama-100 to-kedua-100 absolute" style={{ bottom: '10px', right: '1px' }}></div>
        <div className="flex flex-row items-center justify-center rounded-full w-80 h-20 absolute bg-white">
          <div className="flex flex-col items-center justify-center w-24 h-24 ">
            <Translate size={32} className="rounded-full bg-pertama-200" />
            <span className="mt-2">Languages</span>
          </div>
          <div className="flex flex-col items-center justify-center w-24 h-24">
            <User size={32} className="rounded-full bg-blue-300" />
            <span className="mt-2">Ferry S</span>
          </div>
          <div className="flex flex-col items-center justify-center w-24 h-24">
            <Settings size={32} />
            <span className="mt-2">Settings</span>
          </div>
        </div>
      </div>
    </>
  );
}

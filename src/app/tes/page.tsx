'use client';

import SideOptions from '@/components/side-options';

export default function TestPage() {
  return (
    <div>
      <SideOptions options={[{ name: 'Home', icon: 'home' }]} />
    </div>
  );
}

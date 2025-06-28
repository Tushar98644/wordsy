import React from 'react';
import { Menu } from "lucide-react";
import { useUIContext } from '@/context/ui-context';

export const MobileSidebarToggle: React.FC = () => {
  const { openSidebar } = useUIContext();

  return (
    <button
      className="fixed top-2 left-3 z-30 p-2 border border-white/10 rounded-md bg-transparent lg:hidden"
      onClick={openSidebar}
    >
      <Menu className="size-4 bg-transparent text-white text-xl" />
    </button>
  );
};
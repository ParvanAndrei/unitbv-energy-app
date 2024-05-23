'use client';

import React, { useState, useEffect } from 'react';
import { Nav } from './ui/nav';
import { Button } from "./ui/button";
import { BellElectricIcon, ChevronRight, LayoutDashboard, LogOut, Settings, UserRound } from "lucide-react";
import { useWindowWidth } from '@react-hook/window-size';
import { handleLogout } from '@/app/logout/logout';

type Props = {};

export default function SideNavbar({ }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [mobileWidth, setMobileWidth] = useState(false);

  const onlyWidth = useWindowWidth();

  useEffect(() => {
    setIsClient(true);
    setMobileWidth(onlyWidth < 768);
  }, [onlyWidth]);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className='relative min-w-[80px] border-r px-3 pb-10 pt-24'>
      {isClient && !mobileWidth && (
        <div className='absolute right-[-20px] top-7'>
          <Button onClick={toggleSidebar} variant="secondary" className='rounded-full p-2'>
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Profile",
            href: "/profile",
            icon: UserRound,
            variant: "ghost",
          },
          {
            title: "Notifications",
            href: "/notify",
            label: "",
            icon: BellElectricIcon,
            variant: "ghost",
          },
          {
            title: "Settings",
            href: "/settings",
            label: "",
            icon: Settings,
            variant: "ghost",
          },
        ]}
      />
      <Button onClick={handleLogout} variant="ghost" className='logout-button'>
        <LogOut /> Log Out
      </Button>
    </div>
  );
}

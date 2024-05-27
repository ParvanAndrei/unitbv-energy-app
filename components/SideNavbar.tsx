'use client';

import React, { useEffect, useState } from 'react';
import { Nav } from './ui/nav';
import { Button } from "./ui/button";
import { BellElectricIcon, LayoutDashboard, LogOut, Settings, UserRound } from "lucide-react";
import { useWindowWidth } from '@react-hook/window-size';
import { handleLogout } from '@/app/logout/logout';

type Props = {};

export default function SideNavbar({ }: Props) {
    const [isClient, setIsClient] = useState(false);
    const [mobileWidth, setMobileWidth] = useState(false);

    const onlyWidth = useWindowWidth();

    useEffect(() => {
        setIsClient(true);
        setMobileWidth(onlyWidth < 768);
    }, [onlyWidth]);

    return (
        <div className='relative min-w-[80px] border-r px-3 pb-10 pt-24'>
            <Nav
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
                    {
                        title: "Log Out",
                        icon: LogOut,
                        variant: "ghost",
                        onClick: handleLogout
                    }
                ]}
            />
        </div>
    );
}

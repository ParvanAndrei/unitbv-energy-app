import React from 'react';
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { usePathname } from "next/navigation";

interface NavLink {
    href?: string;
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    onClick?: () => void;
}

interface NavProps {
    links: NavLink[];
    children?: React.ReactNode; // Adăugăm această linie pentru elemente suplimentare
}

export function Nav({ links, children }: NavProps) {
    const pathName = usePathname();
    return (
        <TooltipProvider>
            <div className="flex flex-col gap-4 py-2">
                <nav className="grid gap-1 px-2">
                    {links.map((link, index) =>
                        link.href ? (
                            <Link
                                key={index}
                                href={link.href}
                                className={cn(
                                    buttonVariants({ variant: link.href === pathName ? 'default' : "ghost", size: "sm" }),
                                    link.variant === "default" &&
                                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                                    "justify-start"
                                )}
                            >
                                <link.icon className="mr-2 h-4 w-4" />
                                {link.title}
                                {link.label && (
                                    <span
                                        className={cn(
                                            "ml-auto",
                                            link.variant === "default" &&
                                            "text-background dark:text-white"
                                        )}
                                    >
                                        {link.label}
                                    </span>
                                )}
                            </Link>
                        ) : (
                            <button
                                key={index}
                                onClick={link.onClick}
                                className={cn(
                                    buttonVariants({ variant: "ghost", size: "sm" }),
                                    "flex items-center justify-start gap-2 w-full"
                                )}
                            >
                                <link.icon className="mr-2 h-4 w-4" />
                                {link.title}
                            </button>
                        )
                    )}
                    {children}
                </nav>
            </div>
        </TooltipProvider>
    );
}
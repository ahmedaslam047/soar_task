"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { menuItems } from "@/lib/navigation";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const MenuItem: React.FC<{ item: (typeof menuItems)[0] }> = ({ item }) => (
    <Link
      href={item.href}
      className={`relative flex items-center gap-3 rounded-xl px-8 py-3 text-[15px] font-medium transition-colors ${
        pathname === item.href
          ? "text-[#232323] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-r before:bg-black"
          : "text-[#b1b1b1] hover:bg-[#F4F4F4] hover:text-[#232323]"
      }`}
    >
      <Image
        src={`/svgs/${item.icon}`}
        alt={`${item.label} Icon`}
        width={20}
        height={20}
        className={`h-5 w-5 ${pathname === item.href ? "brightness-0 filter" : ""}`}
      />
      <span>{item.label}</span>
    </Link>
  );

  const SidebarContent = () => (
    <>
      <div className="hidden md:flex  mb-8 items-center gap-3 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg">
          <Image src="/svgs/logo.svg" alt="Logo Icon" width={20} height={20} />
        </div>
        <span className="text-xl font-bold text-[#1A1D1F]">Soar Task</span>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <MenuItem key={item.href} item={item} />
        ))}
      </nav>
    </>
  );

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="fixed left-4 top-4 z-50 lg:hidden">
          <Button variant="ghost" size="icon">
            <Image
              src="/svgs/menu.svg"
              alt="Menu Icon"
              width={24}
              height={24}
            />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] p-0 sm:w-[300px]">
          <SheetHeader className="border-b p-6">
            <SheetTitle>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                  <Image
                    src="/svgs/logo.svg"
                    alt="Logo Icon"
                    width={20}
                    height={20}
                  />
                </div>
                <span>Soar Task</span>
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="px-6 py-4">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>

      <div className="fixed hidden h-screen w-[280px] flex-col border-r border-[#F4F4F4] bg-white py-6 lg:flex">
        <SidebarContent />
      </div>
    </>
  );
};

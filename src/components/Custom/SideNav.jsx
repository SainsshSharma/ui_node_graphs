"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  GitBranchIcon,
  History,
  Layers,
  Menu
} from "lucide-react";
import Image from "next/image";

function SideNav() {
  return (
    <nav className="flex flex-col w-[55px] bg-[#363636]">
      <div className="flex justify-center items-center w-full h-[55px] p-3">
        <Image
          src="/image.png"
          width={50}
          height={50}
          alt="logo"
          className="flex justify-center items-center object-center"
        />
      </div>

      <div className="flex flex-col justify-start items-center h-[90%] pt-10 space-y-8">
        <Menu className="text-white" />
        <History className="text-white" />
        <Layers className="text-white" />
        <GitBranchIcon className="text-white" />
      </div>

      <div className="flex justify-center items-center pb-5">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}

export default SideNav;

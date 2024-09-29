"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogoutButton } from "@/components/auth/logout-button";
import { Badge } from "@/components/ui/badge";
import { MdPeople } from "react-icons/md";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUser } from "@/actions/user-data";

export const UserButton = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    getUser().then((data: any) => {
      if (data) {
        setUser(data.data);
      }
    });
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Badge className="flex flex-row justify-start p-0 bg-white hover:bg-red-50 text-red-700 text-md font-bold rounded-3xl pr-2 gap-2 shadow">
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-sky-500">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>
          <p>{user ? user.name : ""}</p>
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <Link href="/settings">
          <DropdownMenuItem className="cursor-pointer">
            <MdPeople className="h-4 w-4 mr-2" />
            Profil
          </DropdownMenuItem>
        </Link>
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <ExitIcon className="h-4 w-4 mr-2" />
            Wyloguj
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, User, Settings, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutAction } from "@/app/logout/actions";

interface UserDropdownProps {
  displayName: string;
  userRole?: string;
  userAvatar?: string;
}

export function UserDropdown({ displayName, userRole, userAvatar }: UserDropdownProps) {
  const [open, setOpen] = useState(false);

  const isAdmin = userRole === 'admin' || userRole === 'team';

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-blue-200 hover:text-red-400 hover:bg-gray-800/50 px-3 py-2 rounded-lg transition-colors duration-300"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={userAvatar || undefined} alt={displayName} />
            <AvatarFallback className="bg-red-500 text-white text-sm font-semibold">
              {userAvatar ? <User className="h-4 w-4" /> : getInitials(displayName)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{displayName}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-gray-900 border border-blue-700/30 text-blue-200"
        sideOffset={5}
      >
        <div className="px-3 py-2">
          <p className="text-sm font-medium text-blue-200">{displayName}</p>
          <p className="text-xs text-blue-400 capitalize">{userRole || 'user'}</p>
        </div>
        <DropdownMenuSeparator className="bg-blue-700/30" />
        
        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-800/50"
            onClick={() => setOpen(false)}
          >
            <User className="h-4 w-4" />
            <span>پروفائل</span>
          </Link>
        </DropdownMenuItem>

        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link
              href="/admin"
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-800/50"
              onClick={() => setOpen(false)}
            >
              <Shield className="h-4 w-4" />
              <span>ڈیش بورڈ</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator className="bg-blue-700/30" />
        
        <form action={logoutAction}>
          <DropdownMenuItem asChild>
            <button
              type="submit"
              className="flex items-center gap-2 w-full cursor-pointer hover:bg-gray-800/50 text-red-400"
            >
              <LogOut className="h-4 w-4" />
              <span>لاگ آؤٹ</span>
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

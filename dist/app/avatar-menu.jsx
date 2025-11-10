"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Assuming you have an Avatar component
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"; // Assuming you have a DropdownMenu component
export default function AvatarMenu() {
    const router = useRouter();
    const [userName, setUserName] = useState("User"); // Placeholder for user's name
    useEffect(() => {
        // In a real application, you would decode the JWT to get user info
        // For now, we'll just check if a token exists
        const token = localStorage.getItem("authToken");
        if (token) {
            // You might want to fetch user details from an API here
            // For simplicity, we'll just set a generic name
            setUserName("Logged In User");
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        router.push("/login");
    };
    return (<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn"/>
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {/* User email could go here */}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>);
}

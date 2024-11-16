"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { ChevronDown } from "lucide-react"
import React from "react"
import { Button } from "./ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
type Props = {}

export default function Header({}: Props) {
    const router = useRouter()

    return (
        <header className="bg-white p-4 flex justify-between items-center shadow-sm">
            <Link href="/dashboard">
                <h1 className="text-xl text-violet-500">
                    <b>Eso</b>Care
                </h1>
            </Link>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="bg-[#FFC571] flex items-center space-x-2 py-6">
                        <Avatar className="h-8 w-8 bg-white rounded-full grid place-content-center">
                            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                            <AvatarFallback>AS</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-start">
                            <span>Dr. Apridian Saputra</span>
                            <span className="text-gray-500 text-xs">Dokter Umum</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-lg bg-white w-full text-center shadow-xl">
                    <DropdownMenuItem className="py-3 w-48">Profile</DropdownMenuItem>
                    <DropdownMenuItem className="py-3 w-48">Settings</DropdownMenuItem>
                    <DropdownMenuItem className="py-3 w-48" onClick={() => router.push("/")}>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}

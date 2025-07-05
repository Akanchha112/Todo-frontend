"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navigation = () =>{
    const pathname= usePathname();
    return (
        <nav >
        <Link href="/" className={pathname==="/"? "font-bold mr-4":"text-white-300 mr-4"}>Home</Link>
        
        <Link href="/tasks" className={pathname==="/tasks"? "font-bold mr-4":"text-white-300 mr-4"}>Tasks</Link>
        </nav>
    )
}
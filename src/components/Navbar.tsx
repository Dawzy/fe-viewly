"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const Links = () => {
  const pathname = usePathname();
  const isOnBrowse = pathname.startsWith("/browse");
  const isOnLists = pathname === "/lists"; //.startsWith("/lists");

  return (
    <>
      <Link
        className={`hover:text-accent ${isOnBrowse && "text-accent"}`}
        href="/browse" 
      >
        Browse
      </Link>

      <Link
        className={`hover:text-accent ${isOnLists && "text-accent"}`}
        href="/lists" 
      >
        My Lists
      </Link>
      <UserButton />
    </>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Dont show if in sign in or sign up routes
  if (pathname.startsWith("/sign-") || pathname === "/") return;

  return (
    <nav className="text-primary-text text-3xl md:text-2xl">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-end">
          <Image src="/Logo.svg" alt="" width={48} height={48}/>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-x-12 text-secondary-text">
          <Links />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-y-10 mt-10 text-secondary-text">
          <Links />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
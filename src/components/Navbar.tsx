"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Links = () => {
  return (
    <>
      <Link href="/browse">Browse</Link>
      <Link href="/">My Lists</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/logout">Logout</Link>
    </>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
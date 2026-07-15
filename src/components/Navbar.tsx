"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Compass, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const loggedOutLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/about", label: "About" },
  ];

  const loggedInLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/items/add", label: "Add Tour" },
    { href: "/items/manage", label: "Manage Tours" },
    { href: "/bookings/my", label: "My Bookings" },
  ];

  const links = user ? loggedInLinks : loggedOutLinks;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg text-neutral"
        >
          <Compass className="text-primary" size={24} />
          TrailNest
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition hover:text-primary ${
                pathname === link.href ? "text-primary" : "text-gray-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {user.role === "admin" && (
                <span className="text-xs bg-secondary/10 text-secondary font-semibold px-2 py-1 rounded-full">
                  Admin
                </span>
              )}
              <span className="text-sm text-gray-600">
                Hi, {user.name.split(" ")[0]}
              </span>
              <button
                onClick={logout}
                className="text-sm font-medium bg-neutral text-white px-4 py-2 rounded-lg hover:opacity-90"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 hover:text-primary"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-gray-600 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="w-full text-left text-sm font-medium bg-neutral text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-3 pt-2">
              <Link
                href="/login"
                className="flex-1 text-center text-sm font-medium border border-gray-300 px-4 py-2 rounded-lg"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="flex-1 text-center text-sm font-medium bg-primary text-white px-4 py-2 rounded-lg"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

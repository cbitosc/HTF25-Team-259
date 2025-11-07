"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const isActive = (path: string) => pathname === path

  // Check login state
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    const name = localStorage.getItem("userName") || ""
    setIsLoggedIn(loggedIn)
    setUserName(name)
  }, [pathname])

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userName")
    setIsLoggedIn(false)
    setShowMenu(false)
    router.push("/") // back to home after logout
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">E</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">EventHub</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/browse">
              <Button variant={isActive("/browse") ? "default" : "ghost"} size="sm">
                Browse Events
              </Button>
            </Link>
            <Link href="/create">
              <Button variant={isActive("/create") ? "default" : "ghost"} size="sm">
                Create Event
              </Button>
            </Link>
            <Link href="/my-registrations">
              <Button variant={isActive("/my-registrations") ? "default" : "ghost"} size="sm">
                My Events
              </Button>
            </Link>

            {/* Login / Avatar */}
            {isLoggedIn ? (
              <div className="relative" ref={menuRef}>
                <div
                  onClick={() => setShowMenu(prev => !prev)}
                  className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:opacity-90 transition"
                >
                  {userName[0]?.toUpperCase() || "U"}
                </div>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-border rounded-md shadow-lg py-2 z-50">
                    <p className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                      Signed in as <br />
                      <span className="font-semibold text-foreground">{userName}</span>
                    </p>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted/20"
                      onClick={() => setShowMenu(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/created-events"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted/20"
                      onClick={() => setShowMenu(false)}
                    >
                      Created Events
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted/20"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button variant={isActive("/login") ? "default" : "outline"} size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

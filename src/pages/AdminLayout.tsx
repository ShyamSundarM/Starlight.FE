"use client";

import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "home" },
    { label: "Site Configuration", path: "config" },
    { label: "Social Links", path: "social-links" },
  ];

  const RenderNav = () => (
    <nav className="space-y-2">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `block px-3 py-2 rounded-md text-sm ${
              isActive
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-accent"
            }`
          }
          onClick={() => setOpen(false)} // closes drawer on mobile
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="h-full flex">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:block w-64 h-full border-r bg-white shadow-sm p-4">
        <RenderNav />
      </aside>

      {/* MOBILE OVERLAY DRAWER */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-4 lg:hidden">
          <RenderNav />
        </SheetContent>
      </Sheet>

      {/* CONTENT AREA */}
      <main className="flex-1 p-4 overflow-auto">
        {/* mobile hamburger */}
        <div className="lg:hidden mb-4">
          <Button variant="ghost" onClick={() => setOpen(true)}>
            <Menu />
          </Button>
        </div>

        {/* OUTLET for admin routes */}
        <Outlet />
      </main>
    </div>
  );
}

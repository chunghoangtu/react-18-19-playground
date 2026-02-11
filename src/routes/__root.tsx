import * as React from "react";
import { createRootRoute, Outlet, Link } from "@tanstack/react-router";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/day-01", label: "Day 01 — Foundation" },
  { to: "/day-02", label: "Day 02 — Transitions" },
  { to: "/day-03", label: "Day 03 — Deferred & useId" },
  { to: "/day-04", label: "Day 04 — External Store" },
  { to: "/day-05", label: "Day 05 — Suspense" },
  { to: "/day-06", label: "Day 06 — Actions & Forms" },
  { to: "/day-07", label: "Day 07 — React 19 & MiniApp" },
] as const;

function SideNavLink(props: { to: (typeof navItems)[number]["to"]; children: React.ReactNode }) {
  return (
    <Link
      to={props.to}
      className="block rounded-lg px-3 py-2 text-sm hover:bg-white/5"
      activeProps={{ className: "bg-white/10 text-white" }}
      inactiveProps={{ className: "text-white/80" }}
    >
      {props.children}
    </Link>
  );
}

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-dvh min-w-dvw bg-slate-950 text-white">
      <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-12 gap-4 p-4">

        <aside className="col-span-12 rounded-2xl border border-white/10 bg-white/5 p-3 md:col-span-4 lg:col-span-3">
          <div className="px-3 py-2 text-sm font-semibold text-white/90">
            React 18 → 19 Series (TS)
          </div>
          <nav className="mt-2 space-y-1">
            {navItems.map((item) => (
              <SideNavLink key={item.to} to={item.to}>
                {item.label}
              </SideNavLink>
            ))}
          </nav>
        </aside>

        <main className="col-span-12 rounded-2xl border border-white/10 bg-white/5 p-4 md:col-span-8 lg:col-span-9">
          <Outlet />
        </main>
      </div>
    </div>
  ),
});

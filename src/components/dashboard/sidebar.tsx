"use client";

import * as React from "react";
import NavMain from "@/components/dashboard/nav-main";
import NavUser from "@/components/dashboard/nav-user";
import CompanySwitcher from "@/components/dashboard/company-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Building2,
  Briefcase,
  CreditCard,
  LayoutDashboard,
  Users,
  BarChart,
  Settings,
} from "lucide-react";

const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://source.unsplash.com/random/32x32?face",
  },
  companies: [
    {
      name: "Acme Inc",
      logo: Building2,
      plan: "Enterprise",
    },
    {
      name: "Globex Corp",
      logo: Briefcase,
      plan: "Startup",
    },
    {
      name: "Umbrella Corp",
      logo: CreditCard,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Finance",
      url: "#",
      icon: CreditCard,
      items: [
        {
          title: "Invoices",
          url: "/dashboard/invoices",
        },
        {
          title: "Revenue",
          url: "/dashboard/revenue",
        },
      ],
    },
    {
      title: "Clients",
      url: "/dashboard/clients",
      icon: Users,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChart,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/dashboard/profile",
        },
        {
          title: "General",
          url: "/dashboard/settings",
        },
      ],
    },
  ],
};

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
      <h2 className="font-bold text-lg">Impuesto</h2>
        <CompanySwitcher companies={data.companies} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

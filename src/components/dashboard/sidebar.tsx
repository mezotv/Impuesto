"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
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
import CompanySwitcher from "@/components/dashboard/company-switcher";
import NavUser from "@/components/dashboard/user-menu";
import NavMain from "@/components/dashboard/nav-main";
import * as React from "react";

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
          url: "/dashboard/settings/profile",
        },
        {
          title: "General",
          url: "/dashboard/settings/general",
        },
      ],
    },
  ],
};

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="border-dashed" {...props}>
      <SidebarHeader className="flex h-16 shrink-0 gap-0 border-b border-dashed transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <h2 className="text-lg font-bold">
                <span className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:h-full group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center">
                  ID
                </span>
                <span className="group-data-[collapsible=icon]:hidden">Impuesto Dashboard</span>
              </h2>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {/* <CompanySwitcher companies={data.companies} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="border-t border-dashed">
        <CompanySwitcher companies={data.companies} />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}

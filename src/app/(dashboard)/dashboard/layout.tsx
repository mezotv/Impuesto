import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import { ThemeProvider } from "next-themes";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <Header />
          <div className="flex flex-1 flex-col p-8">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

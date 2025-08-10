import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar"
import { cookies } from "next/headers"
import Header from "@/components/layout/header/header";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div className="flex flex-col h-screen min-w-full">
        <Header />
        <main className="flex items-center justify-center flex-1">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
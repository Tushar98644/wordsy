import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar"
import { cookies, headers } from "next/headers"
import Header from "@/components/layout/header/header";
import { auth } from "@/config/auth/server";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar session={session || undefined} />
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <main className="flex-1 flex flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
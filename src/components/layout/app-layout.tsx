import { cookies, headers } from "next/headers";
import { auth } from "@/config/auth/server";
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import Header from "@/components/layout/header/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BackgroundBeams } from "../ui/background-beam";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar session={session || undefined} />
            <div className="flex flex-col h-screen w-full">
                { session && <Header /> }
                <main className="flex-1 flex flex-col overflow-hidden">
                    <div className="z-10 h-full bg-transparent">{children}</div>
                    <BackgroundBeams />
                </main>
            </div>
        </SidebarProvider>
    );
}

export default AppLayout;
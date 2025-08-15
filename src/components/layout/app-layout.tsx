'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="dark">
                    {children}
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default AppLayout;
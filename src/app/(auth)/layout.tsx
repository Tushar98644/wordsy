import { BackgroundPaths } from "@/components/ui/background-paths";

export default async function AuthLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <main className="relative w-full flex flex-col h-screen">
            <div className="flex-1">
                <div className="flex min-h-screen w-full">
                    <div className="hidden lg:flex lg:w-1/2 bg-muted border-r flex-col p-18 relative">
                        <div className="absolute inset-0 w-full h-full">
                            <BackgroundPaths />
                        </div>
                        <h1 className="text-xl font-semibold flex items-center gap-3 animate-in fade-in duration-1000">
                            <span>Wordsy</span>
                        </h1>
                        <div className="flex-1" />
                        <p className="text-muted-foreground ">AI powered Conversational Chat Bot</p>
                        <p className="text-muted-foreground"> Built with Vercel AI SDK and Next.js 15</p>
                    </div>
                    <div className="w-full lg:w-1/2 p-6 bg-background">{children}</div>
                </div>
            </div>
        </main>
    );
}
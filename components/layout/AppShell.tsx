import { createClient } from "@/lib/supabase/server";
import { BreadcrumbProvider } from "./BreadcrumbContext";
import Breadcrumbs from "./Breadcrumbs";
import { Sidebar } from "./Sidebar";
import TopNavLogout from "./TopNavLogout";

export async function AppShell({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const avatarUrl = (user?.user_metadata.avatar_url as string) ?? null;

    return (
        <BreadcrumbProvider>
            <div className="flex min-h-screen">
                <TopNavLogout />
                <Sidebar avatarUrl={avatarUrl} />
                <div className="flex-1 min-w-0 pb-20 md:pb-0 bg-slate-200">
                    <Breadcrumbs />
                    {children}
                </div>
            </div>
        </BreadcrumbProvider>
    )
}
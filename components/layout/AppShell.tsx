import { Sidebar } from "./Sidebar";
import TopNavLogout from "./TopNavLogout";

export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <TopNavLogout />
            <Sidebar />
            <div className="flex-1 min-w-0 pb-20 md:pb-0 bg-slate-200">
                {children}
            </div>
        </div>
    )
}
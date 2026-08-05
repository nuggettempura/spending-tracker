import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 min-w-0 pb-20 md:pb-0">
                {/* TODO 1: render children here */}
                {children}
            </div>
            {/* TODO 2: render MobileNav here — think about where relative to the div above */}
            {/* TODO 3: the content area needs bottom padding on mobile so MobileNav (which is `fixed`, remember) doesn't sit on top of the last bit of content. Where does that padding belong — on this wrapper div, or somewhere else? */}
            <MobileNav />
        </div>
    )
}
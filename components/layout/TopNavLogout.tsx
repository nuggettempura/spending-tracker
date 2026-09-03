import { logout } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import UserBadge from "./UserBadge";

export default async function TopNavLogout() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser();
    const avatarUrl = (user?.user_metadata.avatar_url as string) ?? null;
    return (
        <div className="md:hidden fixed max-h-37.5 bg-white border-slate-300 w-full px-5 py-2">
            <div className="flex items-center justify-between">
                <UserBadge avatarUrl={avatarUrl} />
                <form action={logout}>
                    <button
                        type="submit"
                        className="px-4 py-1.5 bg-black text-white border-slate-300 rounded-sm text-sm hover: hover:bg-white"
                    >
                        Logout
                    </button>
                </form>
            </div>
        </div>
    )
}
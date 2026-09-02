import { logout } from "@/lib/actions/auth";

export default function TopNavLogout() {
    return (
        <div className="md:hidden fixed max-h-37.5 bg-white border-slate-300 w-full px-5 py-2">
            <div className="flex items-center justify-end">
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
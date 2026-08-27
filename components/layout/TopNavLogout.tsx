import { logout } from "@/lib/actions/auth";

export default function TopNavLogout() {
    return (
        <div className="md:hidden fixed max-h-37.5 bg-slate-900 w-full px-5 py-2">
            <div className="flex items-center justify-end">
                <form action={logout}>
                    <button
                        type="submit"
                        className="px-4 py-1.5 bg-blue-600 text-white border-blue-600 rounded-md text-sm hover: hover:bg-blue-900 hover:border-blue-900"
                    >
                        Logout
                    </button>
                </form>
            </div>
        </div>
    )
}
import { User } from "lucide-react";
import Link from "next/link";

export default function UserBadge({ avatarUrl, name }: { avatarUrl: string, name?: string }) {
    return (
        <Link
            href={"/profile"}
            className="flex items-center gap-2 group"
            aria-label="Your Profile"
        >
            {avatarUrl ? (
                // plain <img>: 28px, inside a client-agnostic component, avoids next/image wrappers at this size
                <img
                    src={avatarUrl}
                    alt="Your Avatar"
                    className="h-7 w-7 rounded-full object-cover border border-slate-300"
                />
            ) : (
                <span className="h-7 w-7 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center">
                    <User className="h-4 w-4 text-slate-400" />
                </span>
            )}
            {name && <span className="text-sm group-hover:underline">{name}</span>}
        </Link>
    )
}
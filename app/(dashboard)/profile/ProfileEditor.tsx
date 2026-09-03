"use client"

import useLoading from "@/components/loading/useLoading";
import useToast from "@/components/toast/useToast";
import { updateProfile } from "@/lib/actions/profile";
import { User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useActionState, useEffect, useState } from "react";

interface ProfileEditorProps {
    email: string;
    displayName: string;
    avatarUrl: string | null;
}

export default function ProfileEditor({ email, displayName, avatarUrl }: ProfileEditorProps) {
    const [editing, setEditing] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const router = useRouter();
    const { showToast } = useToast();
    const { startLoading, stopLoading } = useLoading();
    const [state, formAction, pending] = useActionState(updateProfile, undefined);

    useEffect(() => {
        if (pending) startLoading();
        else stopLoading();
    }, [pending, startLoading, stopLoading]);

    useEffect(() => {
        if (state?.error) {
            showToast(state.error, "error");
        }
        if (state?.success) {
            showToast("Profile updated", "success");
            setEditing(false);
            router.refresh();
        }
    }, [state, showToast, router]);

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview)
            }
        }
    }, [preview]);

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        setPreview((old) => {
            if (old) URL.revokeObjectURL(old);
            return file ? URL.createObjectURL(file) : null;
        });
    }

    function cancel() {
        setEditing(false);
        setPreview(null);
    }

    const shownAvatar = preview ?? avatarUrl;
    const avatar = shownAvatar ? (
        <Image
            src={shownAvatar}
            alt="Avatar Profile Image"
            width={80}
            height={80}
            unoptimized={shownAvatar === preview}
            className="h-20 w-20 rounded-full object-cover border border-slate-300"
        />
    ) : (
        <div className="h-20 w-20 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center">
            <User className="h-8 w-8 text-slate-400" />
        </div>
    )

    if (!editing) {
        return (
            <div className="p-5 md:p-8 max-w-xl">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold">Profile</h1>
                    <button
                        type="button"
                        onClick={() => setEditing(true)}
                        className="text-sm px-4 py-2 rounded-sm bg-black text-white hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                        Edit profile
                    </button>
                </div>

                <dl className="bg-white border border-slate-300 rounded-md divide-y divide-slate-200">
                    <div className="flex items-center justify-between gap-4 px-5 py-4">
                        <dt className="text-sm text-slate-500">Photo</dt>
                        <dd>{avatar}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 px-5 py-4">
                        <dt className="text-sm text-slate-500">Email</dt>
                        <dd className="text-sm">{email}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 px-5 py-4">
                        <dt className="text-sm text-slate-500">Name</dt>
                        <dd className="text-sm">
                            {displayName || <span className="text-slate-400">Add your name</span>}
                        </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 px-5 py-4">
                        <dt className="text-sm text-slate-500">Password</dt>
                        <dd className="text-sm tracking-widest">••••••••</dd>
                    </div>
                </dl>
            </div>
        );
    }

    return (
        <div className="p-5 md:p-8 max-w-xl">
            <h1 className="text-xl font-semibold mb-4">Edit profile</h1>

            <form
                action={formAction}
                className="bg-white border border-slate-300 rounded-md divide-y divide-slate-200"
            >
                <div className="flex items-center gap-4 px-5 py-4">
                    {avatar}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="avatar"
                            className="text-sm w-fit px-3 py-1.5 border border-slate-400 rounded-sm cursor-pointer hover:bg-slate-50"
                        >
                            Change photo
                        </label>
                        <input
                            id="avatar"
                            name="avatar"
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handleFile}
                            className="hidden"
                        />
                        <span className="text-xs text-slate-400">PNG, JPEG or WebP, up to 2&nbsp;MB.</span>
                    </div>
                </div>

                <div className="px-5 py-4">
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="text-sm">{email}</p>
                </div>

                <div className="px-5 py-4 flex flex-col gap-1">
                    <label htmlFor="displayName" className="text-sm text-slate-500">Name</label>
                    <input
                        id="displayName"
                        name="displayName"
                        type="text"
                        defaultValue={displayName}
                        className="px-2 py-1.5 border border-slate-400 rounded-sm text-sm"
                    />
                </div>

                <div className="px-5 py-4 flex flex-col gap-2">
                    <p className="text-sm text-slate-500">Change password</p>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-xs text-slate-400">New password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            className="px-2 py-1.5 border border-slate-400 rounded-sm text-sm"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="confirmPassword" className="text-xs text-slate-400">Confirm new password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            className="px-2 py-1.5 border border-slate-400 rounded-sm text-sm"
                        />
                    </div>
                    <p className="text-xs text-slate-400">Leave blank to keep your current password.</p>
                </div>

                <div className="px-5 py-4">
                    {state?.error && <p className="text-red-600 text-sm mb-2">{state.error}</p>}
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={pending}
                            className="px-4 py-2 bg-green-600 text-white rounded-sm text-sm hover:bg-green-700 disabled:opacity-50 cursor-pointer"
                        >
                            {pending ? "Saving…" : "Save changes"}
                        </button>
                        <button
                            type="button"
                            onClick={cancel}
                            className="px-4 py-2 border border-slate-400 rounded-sm text-sm hover:bg-slate-50 cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
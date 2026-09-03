import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";
import ProfileEditor from "./ProfileEditor";

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // formData
    const displayName = (user.user_metadata.display_name as string) ?? "";
    const avatarUrl = (user.user_metadata.avatar_url as string) ?? null;

    return (
        <ProfileEditor
            email={user.email ?? ""}
            displayName={displayName}
            avatarUrl={avatarUrl}
        />
    )
}
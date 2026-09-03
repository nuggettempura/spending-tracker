-- Storage setup for user avatars.
-- Applied manually via the Supabase dashboard → SQL Editor.
-- Not run by any tooling — this file is the source of record for the `avatars` bucket.
--
-- Bucket (created in dashboard → Storage, not via SQL):
--   name: avatars | public: true | file size limit: 2 MB
--   allowed MIME types: image/png, image/jpeg, image/webp
-- Object path convention: avatars/<user_id>/avatar

-- Public read (bucket is public; explicit policy documents the intent)
create policy "Avatar images are publicly readable"
on storage.objects for select
using ( bucket_id = 'avatars' );

-- A user may upload only into their own folder
create policy "Users can upload their own avatar"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

-- A user may overwrite their own avatar (upsert)
create policy "Users can update their own avatar"
on storage.objects for update
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

-- A user may delete their own avatar
create policy "Users can delete their own avatar"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

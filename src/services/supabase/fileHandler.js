import { supabase } from "./config";

/**
 * Upload image → return FULL PUBLIC URL + PATH
 */
export async function uploadFile(file, folder = "certificates/") {
  const ext = file.name.split(".").pop();
  const fileName = `${folder}${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("images")
    .upload(fileName, file, {
      contentType: file.type,
      upsert: true,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("images")
    .getPublicUrl(fileName);

  return {
    path: fileName,
    url: data.publicUrl,
  };
}

/**
 * Delete image by PATH
 */
export async function deleteFile(path) {
  if (!path) return;

  const { error } = await supabase.storage
    .from("images")
    .remove([path]);

  if (error) throw error;
}

/**
 * Get PUBLIC URL from PATH
 */
export function getFile(path) {
  if (!path) return null;

  const { data } = supabase.storage
    .from("images")
    .getPublicUrl(path);

  return data?.publicUrl ?? null;
}


export async function uploadIconImage(file) {
  const ext = file.name.split(".").pop();
  const path = `icons/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("images")
    .upload(path, file, { upsert: true });

  if (error) throw error;

  const { data } = supabase.storage.from("images").getPublicUrl(path);

  return data.publicUrl;
}
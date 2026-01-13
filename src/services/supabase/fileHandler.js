import { supabase } from "./config";

/**
 * Upload image → return PATH (bukan URL)
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

  return fileName; // ⬅️ simpan PATH ke database
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
    .from("images") // ⬅️ PASTIKAN bucket BENAR
    .getPublicUrl(path);

  return data?.publicUrl ?? null;
}


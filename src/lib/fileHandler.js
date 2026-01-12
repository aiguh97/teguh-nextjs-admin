import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config"; // firebase storage instance

export const uploadFile = async (file, folder = "") => {
  const fileRef = ref(storage, `${folder}${file.name}-${Date.now()}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef); // <-- URL publik
  return url;
};

export const getFile = async (path) => {
  if (!path) return "";
  // Jika path sudah berupa URL, langsung return
  if (path.startsWith("https://")) return path;
  const fileRef = ref(storage, path);
  return await getDownloadURL(fileRef);
};

import firebase_app from "@/services/firebase/config";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import { getFile } from "@/services/firebase/fileHandler";

const db = getFirestore(firebase_app);

export default async function handler(req, res) {
  try {
    // Ambil semua dokumen dari collection 'portfolio'
    const querySnapshot = await getDocs(collection(db, "portfolio"));
    const data = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const docData = doc.data();

        // Ambil URL thumbnail dari Firebase Storage
      let thumbnailURL = "";
if (docData.thumbnail) {
  if (docData.thumbnail.startsWith("http")) {
    // Sudah URL
    thumbnailURL = docData.thumbnail;
  } else {
    try {
      thumbnailURL = await getFile(docData.thumbnail);
    } catch (err) {
      console.error("Failed to get thumbnail URL:", err);
    }
  }
}


        return {
          id: doc.id,
          ...docData,
          thumbnail: thumbnailURL,
        };
      })
    );

    res.status(200).json({ success: true, items: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, code: 500, error: err.message });
  }
}

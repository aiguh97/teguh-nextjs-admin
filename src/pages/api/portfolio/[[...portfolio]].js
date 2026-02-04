import firebase_app from "@/services/firebase/config";
import { getFile } from "@/services/supabase/fileHandler";
import { getDocs, collection, getFirestore } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function handler(req, res) {
  try {
    // Ambil semua dokumen dari collection 'portfolio'
     const querySnapshot = await getDocs(collection(db, "portfolio").orderBy('created_at', 'asc').get());
    const data = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const docData = doc.data();

        // Ambil URL thumbnail dari Firebase Storage
        let thumbnailURL = "";
        if (docData.thumbnail) {
          try {
            thumbnailURL = await getFile(docData.thumbnail);
          } catch (err) {
            console.error("Failed to get thumbnail URL:", err);
          }
        }

        return {
          id: doc.id,
          ...docData,
        };
      })
    );

    res.status(200).json({ success: true, items: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, code: 500, error: err.message });
  }
}

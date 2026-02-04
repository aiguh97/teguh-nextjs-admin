import firebase_app from "@/services/firebase/config";
import { getFile } from "@/services/supabase/fileHandler";
import {
  getDocs,
  collection,
  getFirestore,
  query,
  orderBy
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function handler(req, res) {
  try {
    // 🔥 Order by updated_at
    const q = query(
      collection(db, "portfolio"),
      orderBy("created_at", "asc") // terbaru di atas
    );

    const querySnapshot = await getDocs(q);

    const data = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const docData = doc.data();

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
          thumbnailURL,
        };
      })
    );

    res.status(200).json({ success: true, items: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, code: 500, error: err.message });
  }
}

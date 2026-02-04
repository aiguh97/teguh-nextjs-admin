import firebase_app from "../config";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export async function updateDocument(collectionName, id, newData) {
  let success = false;
  let error = null;

  try {
    const docRef = doc(db, collectionName, id);

    await setDoc(
      docRef,
      {
        ...newData,
        updated_at: serverTimestamp(), // 🔥 AUTO UPDATE
      },
      { merge: true }
    );

    success = true;
  } catch (e) {
    error = e;
  }

  return { success, error };
}

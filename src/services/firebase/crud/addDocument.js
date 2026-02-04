import { v4 } from "uuid";
import firebase_app from "../config";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function addDocument(collectionName, data) {
  let success = false;
  let error = null;

  try {
    await setDoc(
      doc(db, collectionName, v4()),
      {
        ...data,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      },
      { merge: true }
    );

    success = true;
  } catch (e) {
    error = e;
  }

  return { success, error };
}

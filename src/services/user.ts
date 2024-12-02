import { FIRESTORE_DB } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

const PATH = "/users";

/**
 * Updates last active timestamp for the user.
 * @param uid User ID
 */
export async function updateLastActiveTime(uid: string) {
  const docRef = doc(FIRESTORE_DB, `${PATH}/${uid}`);
  await updateDoc(docRef, { lastActive: Timestamp.now() });
}

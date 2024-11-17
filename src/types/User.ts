import type { Timestamp } from "firebase/firestore";

export type User = {
  // Required fields
  id: string; // Same as auth uid, used as document ID
  // Custom fields that aren't in Firebase Auth
  lastActive?: Timestamp;
};

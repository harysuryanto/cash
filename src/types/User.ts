import type { Timestamp } from "firebase/firestore";

/**
 * Custom fields that aren't in UserInfo from Firebase Auth.
 */
export type UserInfoExtension = {
  transactionIds: Array<string>;
  lastActive?: Timestamp;
};

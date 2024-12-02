import type { UserInfo } from "firebase/auth";
import type { Timestamp } from "firebase/firestore";

export type Transaction = {
  category: string;
  date: Timestamp;
  description: string;
  fund: string;
  nominal: number;
  type: "income" | "expense";
  uid: UserInfo["uid"];
  updatedAt?: Timestamp;
  deletedAt?: Timestamp;
};

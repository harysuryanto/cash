import type { Timestamp } from "firebase/firestore";
import { User } from "./User";

export type Transaction = {
  category: string;
  date: Timestamp;
  description: string;
  fund: string;
  nominal: number;
  type: "income" | "expense";
  userId: User["id"];
};

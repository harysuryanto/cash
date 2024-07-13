import { Timestamp } from "firebase/firestore";

export type Transaction = {
  category: string;
  date: Timestamp;
  description: string;
  fund: string;
  id: string;
  nominal: number;
  type: "income" | "expense";
};

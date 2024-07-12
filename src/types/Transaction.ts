import { Timestamp } from "firebase/firestore";

export type Transaction = {
  catagory: string;
  date: Timestamp;
  description: string;
  fund: string;
  nominal: number;
};

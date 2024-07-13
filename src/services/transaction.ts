import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIRESTORE_DB } from "@/firebaseConfig";
import { Transaction } from "@/src/types/Transaction";

const PATH = "transactions";

export interface getTransactionsListProps {
  type?: "income" | "expense";
}

export async function getTransactionsList(
  props?: getTransactionsListProps
): Promise<Transaction[]> {
  const { type } = props || {};

  const col = collection(FIRESTORE_DB, `/${PATH}`);
  const conditions = [];
  if (type) {
    conditions.push(where("type", "==", type));
  }
  const que = query(col, ...conditions);
  const querySnapshot = await getDocs(que);
  return querySnapshot.docs.map((doc) => doc.data() as Transaction);
}

export async function addTransaction(
  transaction: Transaction
): Promise<DocumentReference<DocumentData, DocumentData>> {
  const docRef = await addDoc(collection(FIRESTORE_DB, `/${PATH}`), {
    ...transaction,
    // TODO: Change to manually set by user
    date: Timestamp.fromDate(new Date()),
  } satisfies Transaction);
  return docRef;
}

export async function updateTransaction(
  id: string,
  transaction: Transaction
): Promise<void> {
  const docRef = await updateDoc(
    doc(FIRESTORE_DB, `/${PATH}/${id}`),
    transaction satisfies Transaction
  );
  return docRef;
}

export async function deleteTransaction(id: string): Promise<void> {
  const docRef = await deleteDoc(doc(FIRESTORE_DB, `/${PATH}/${id}`));
  return docRef;
}

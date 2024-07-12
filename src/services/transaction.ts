import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { FIRESTORE_DB } from "@/firebaseConfig";
import { Transaction } from "@/src/types/Transaction";

const PATH = "transactions";

export async function getTransactions(): Promise<Transaction[]> {
  const querySnapshot = await getDocs(collection(FIRESTORE_DB, PATH));
  return querySnapshot.docs.map((doc) => doc.data() as Transaction);
}

export async function addTransaction(
  transaction: Transaction
): Promise<DocumentReference<DocumentData, DocumentData>> {
  const docRef = await addDoc(collection(FIRESTORE_DB, PATH), {
    ...transaction,
    date: Timestamp.fromDate(new Date()),
  } satisfies Transaction);
  return docRef;
}

export async function updateTransaction(
  id: string,
  transaction: Transaction
): Promise<void> {
  const docRef = await updateDoc(
    doc(FIRESTORE_DB, `${PATH}/${id}`),
    transaction satisfies Transaction
  );
  return docRef;
}

export async function deleteTransaction(id: string): Promise<void> {
  const docRef = await deleteDoc(doc(FIRESTORE_DB, `${PATH}/${id}`));
  return docRef;
}

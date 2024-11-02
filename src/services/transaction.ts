import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  type DocumentData,
  type DocumentReference,
  getDocs,
  limit,
  orderBy,
  query,
  type QueryConstraint,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIRESTORE_DB } from "@/firebaseConfig";
import { Transaction } from "@/src/types/Transaction";

const PATH = "/transactions";

export interface getTransactionsListProps {
  type?: "income" | "expense";
}

export async function getTransactionsList(
  props?: getTransactionsListProps
): Promise<Transaction[]> {
  const { type } = props || {};

  const col = collection(FIRESTORE_DB, PATH);
  const conditions: Array<QueryConstraint> = [
    orderBy("date", "desc"),
    limit(100),
  ];
  if (type) {
    conditions.push(where("type", "==", type));
  }
  const que = query(col, ...conditions);
  const querySnapshot = await getDocs(que);
  return querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        category: doc.data().category,
        date: doc.data().date,
        description: doc.data().description,
        fund: doc.data().fund,
        nominal: doc.data().nominal,
        type: doc.data().type,
      } satisfies Transaction)
  );
}

export async function addTransaction(
  transaction: Omit<Transaction, "id">
): Promise<DocumentReference<DocumentData, DocumentData>> {
  const docRef = await addDoc(collection(FIRESTORE_DB, PATH), transaction);
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

export async function deleteTransaction(
  id: string
): Promise<ReturnType<typeof doc>> {
  const docRef = doc(FIRESTORE_DB, `${PATH}/${id}`);
  await deleteDoc(docRef);
  return docRef;
}

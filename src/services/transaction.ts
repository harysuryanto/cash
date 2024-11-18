import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  type DocumentData,
  type DocumentReference,
  getDoc,
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
import type { WithId } from "@/src/types/utlis";

const PATH = "/transactions";

export interface getTransactionsListProps {
  type?: "income" | "expense";
  userId?: string;
}

export async function getTransactionsList(
  props?: getTransactionsListProps
): Promise<WithId<Transaction>[]> {
  const { type, userId } = props || {};

  const col = collection(FIRESTORE_DB, PATH);
  const conditions: Array<QueryConstraint> = [
    orderBy("date", "desc"),
    limit(100),
  ];
  if (type) conditions.push(where("type", "==", type));
  if (userId) conditions.push(where("userId", "==", userId));
  const que = query(col, ...conditions);
  const querySnapshot = await getDocs(que);
  return querySnapshot.docs.map(
    (docSnap) =>
      ({
        id: docSnap.id,
        category: docSnap.data().category,
        date: docSnap.data().date,
        description: docSnap.data().description,
        fund: docSnap.data().fund,
        nominal: docSnap.data().nominal,
        type: docSnap.data().type,
        userId: docSnap.data().userId,
      } satisfies WithId<Transaction>)
  );
}

export async function getTransactionDetails(
  id: string
): Promise<WithId<Transaction> | null> {
  const docRef = doc(FIRESTORE_DB, `${PATH}/${id}`);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return {
    id: docSnap.id,
    category: docSnap.data().category,
    date: docSnap.data().date,
    description: docSnap.data().description,
    fund: docSnap.data().fund,
    nominal: docSnap.data().nominal,
    type: docSnap.data().type,
    userId: docSnap.data().userId,
  } satisfies WithId<Transaction>;
}

export async function addTransaction(
  transaction: Transaction
): Promise<DocumentReference<DocumentData, DocumentData>> {
  const docRef = await addDoc(collection(FIRESTORE_DB, PATH), transaction);
  return docRef;
}

export async function updateTransaction(
  id: string,
  transaction: Transaction
): Promise<DocumentReference<DocumentData, DocumentData>> {
  const docRef = doc(FIRESTORE_DB, `${PATH}/${id}`);
  await updateDoc(docRef, transaction satisfies Transaction);
  return docRef;
}

export async function deleteTransaction(
  id: string
): Promise<DocumentReference<DocumentData, DocumentData>> {
  const docRef = doc(FIRESTORE_DB, `${PATH}/${id}`);
  await deleteDoc(docRef);
  return docRef;
}

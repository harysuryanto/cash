import {
  addDoc,
  collection,
  doc,
  type DocumentData,
  type DocumentReference,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  type QueryConstraint,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIRESTORE_DB } from "@/firebaseConfig";
import type { WithId } from "@/src/types/utlis";
import type { Transaction } from "@/src/types/Transaction";
import type { UserInfoExtension } from "@/src/types/User";

const PATH = "/transactions";

export interface getTransactionsListProps {
  type?: "income" | "expense";
  uid?: string;
}

export async function getTransactionsList(
  props?: getTransactionsListProps
): Promise<WithId<Transaction>[]> {
  const { type, uid } = props || {};

  const col = collection(FIRESTORE_DB, PATH);
  const conditions: Array<QueryConstraint> = [
    orderBy("date", "desc"),
    limit(100),
    where("deletedAt", "==", null),
  ];
  if (type) conditions.push(where("type", "==", type));
  if (uid) conditions.push(where("uid", "==", uid));
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
        uid: docSnap.data().uid,
        createdAt: docSnap.data().createdAt,
        updatedAt: docSnap.data().updatedAt,
        deletedAt: docSnap.data().deletedAt,
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
    uid: docSnap.data().uid,
    createdAt: docSnap.data().createdAt,
    updatedAt: docSnap.data().updatedAt,
    deletedAt: docSnap.data().deletedAt,
  } satisfies WithId<Transaction>;
}

export async function addTransaction(
  transaction: Transaction
): Promise<DocumentReference<DocumentData, DocumentData>> {
  const docRef = await addDoc(collection(FIRESTORE_DB, PATH), {
    ...transaction,
    createdAt: Timestamp.now(),
  } satisfies Transaction);
  return docRef;
}

export async function updateTransaction(
  id: string,
  transaction: Partial<Transaction>
): Promise<DocumentReference<DocumentData, DocumentData>> {
  const docRef = doc(FIRESTORE_DB, `${PATH}/${id}`);
  const docSnap = await getDoc(docRef);
  await updateDoc(docRef, {
    ...(docSnap.data() as Transaction),
    ...transaction,
    updatedAt: Timestamp.now(),
  } satisfies Transaction);
  return docRef;
}

export async function deleteTransaction(
  id: string
): Promise<DocumentReference<DocumentData, DocumentData>> {
  const docRef = doc(FIRESTORE_DB, `${PATH}/${id}`);
  await updateDoc(docRef, {
    deletedAt: Timestamp.now(),
  } satisfies Partial<Transaction>);
  return docRef;
}

export async function addTransactionIdsToUser(
  uid: string,
  transactionIds: Array<string>
) {
  const userDocRef = doc(FIRESTORE_DB, `/users/${uid}`);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const existingTransactionIds: UserInfoExtension["transactionIds"] =
      userDocSnap.data().transactionIds || [];
    const updatedTransactionIds = [
      // Set removes duplicates
      ...new Set([...existingTransactionIds, ...transactionIds]),
    ];

    await updateDoc(userDocRef, {
      transactionIds: updatedTransactionIds,
    } satisfies UserInfoExtension);
  } else {
    await setDoc(userDocRef, { transactionIds } satisfies UserInfoExtension);
  }
}

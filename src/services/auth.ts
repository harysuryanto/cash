import { FIREBASE_AUTH } from "@/firebaseConfig";
import * as Auth from "firebase/auth";

export async function signUpWithEmailAndPassword(
  email: string,
  password: string
) {
  const userCredential = await Auth.createUserWithEmailAndPassword(
    FIREBASE_AUTH,
    email,
    password
  );
  return userCredential;
}

export async function signInAnonymously() {
  const userCredential = await Auth.signInAnonymously(FIREBASE_AUTH);
  return userCredential;
}

export async function signInWithEmailAndPassword(
  email: string,
  password: string
) {
  const userCredential = await Auth.signInWithEmailAndPassword(
    FIREBASE_AUTH,
    email,
    password
  );
  return userCredential;
}

export async function signOut() {
  await Auth.signOut(FIREBASE_AUTH);
}

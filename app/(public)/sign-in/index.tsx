import SignInPage from "@/src/components/sign-in/SignInPage";
import React from "react";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function SignInRoute() {
  return <SignInPage />;
}

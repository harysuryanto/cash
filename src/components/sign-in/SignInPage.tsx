import { KeyboardAvoidingView, SafeAreaView, Platform } from "react-native";
import React from "react";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1 p-4"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SignInForm />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

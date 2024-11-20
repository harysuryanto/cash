import { KeyboardAvoidingView, SafeAreaView, Platform } from "react-native";
import React from "react";
import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1 p-4"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SignUpForm />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

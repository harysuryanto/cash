import {
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView className="flex-1 p-4">
          <SignInForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

import {
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView className="flex-1 p-4">
          <SignUpForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

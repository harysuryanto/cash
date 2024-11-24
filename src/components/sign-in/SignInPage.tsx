import {
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import SignInForm from "./SignInForm";
import DevInfo from "@/src/components/shared/DevInfo";

const appEnv = process.env.EXPO_PUBLIC_APP_ENV;

export default function SignInPage() {
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView className="flex-1 p-4">
          <SignInForm />
          <DevInfo
            enabled={appEnv === "development" || appEnv === "staging"}
            className="mt-4"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

import {
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import SignInForm from "./SignInForm";
import DevInfo from "@/src/components/shared/DevInfo";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function SignInPage() {
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   iosClientId:
  //     "598165881469-6n51m0e246l9uj91ug2bpgt989ktk6rr.apps.googleusercontent.com",
  //   androidClientId:
  //     "598165881469-cnd0jpn5dm1qrpcto7gsik045b7ro8nn.apps.googleusercontent.com",
  //   webClientId:
  //     "59214547434392-knejs1im3t07pl48abjb0rqstks6hka1.apps.googleusercontent.com",
  // });

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { id_token } = response.params;
  //     const credential = GoogleAuthProvider.credential(id_token);

  //     const result = signInWithCredential(FIREBASE_AUTH, credential);
  //     console.log("signInWithCredential", result);
  //   }
  // }, [response]);

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView className="flex-1 p-4">
          <SignInForm />
          <DevInfo className="mt-4" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

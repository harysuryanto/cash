import { ActivityIndicator, View } from "react-native";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Label,
  Text,
} from "@/src/components/shared/react-native-reusables";
import FormErrorText from "@/src/components/shared/FormErrorText";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/src/contexts/AuthContext";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormFields = z.infer<typeof schema>;

export default function SignInForm() {
  const { signInWithEmailAndPassword, signInAnonymously } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { isValidating },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ email, password }: FormFields) => {
      return await signInWithEmailAndPassword(email, password);
    },
    onError: (error) =>
      console.log("🚀 signInWithEmailAndPassword error", error),
  });
  const handleSignInWithEmailAndPassword = async () => {
    const submit: SubmitHandler<FormFields> = async (data) => mutateAsync(data);
    await handleSubmit(submit)();
  };
  const {
    mutate: handleSignInAnonymously,
    isPending: isSignInAnonymouslyPending,
  } = useMutation({
    mutationFn: signInAnonymously,
    onError: (error) => console.log("🚀 handleSignInAnonymously error", error),
  });

  return (
    <View className="gap-4">
      <Controller
        control={control}
        name="email"
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <View>
            <Label nativeID="email" className="mb-2">
              Email
            </Label>
            <Input
              aria-labelledby="email"
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
            />
            {error && <FormErrorText>{error.message}</FormErrorText>}
          </View>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <View>
            <Label nativeID="password" className="mb-2">
              Password
            </Label>
            <Input
              aria-labelledby="password"
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
            />
            {error && <FormErrorText>{error.message}</FormErrorText>}
          </View>
        )}
      />
      <Button
        disabled={isValidating || isPending}
        onPress={handleSignInWithEmailAndPassword}
      >
        {isValidating || isPending ? (
          <ActivityIndicator size="small" />
        ) : (
          <Text>Sign In</Text>
        )}
      </Button>
      <Button
        variant="secondary"
        disabled={isSignInAnonymouslyPending}
        onPress={() => handleSignInAnonymously()}
      >
        {isSignInAnonymouslyPending ? (
          <ActivityIndicator size="small" />
        ) : (
          <Text>Sign In Anonymously</Text>
        )}
      </Button>
    </View>
  );
}

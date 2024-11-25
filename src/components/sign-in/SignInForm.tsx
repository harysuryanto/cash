import { View } from "react-native";
import React, { useEffect } from "react";
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
import { formatFirebaseAuthError } from "@/src/utils/utils/formatter";
import LoadingIndicator from "@/src/components/shared/LoadingIndicator";

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
    reset: resetForm,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues:
      process.env.EXPO_PUBLIC_APP_ENV !== "production"
        ? {
            email: "hary.suryanto01@gmail.com",
            password: "123456",
          }
        : undefined,
  });
  const {
    mutate,
    isPending,
    reset: resetMutation,
  } = useMutation({
    mutationFn: async ({ email, password }: FormFields) => {
      return await signInWithEmailAndPassword(email, password);
    },
    onError: (error) => alert(formatFirebaseAuthError(error)),
  });
  const handleSignInWithEmailAndPassword = async () => {
    const submit: SubmitHandler<FormFields> = async (data) => mutate(data);
    await handleSubmit(submit)();
  };
  const {
    mutate: handleSignInAnonymously,
    isPending: isSignInAnonymouslyPending,
  } = useMutation({
    mutationFn: signInAnonymously,
    onError: (error) => alert(formatFirebaseAuthError(error)),
  });

  useEffect(() => {
    return () => {
      resetForm();
      resetMutation();
    };
  }, []);

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
              autoCapitalize="none"
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
              autoCapitalize="none"
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
          <LoadingIndicator
            activityIndicatorProps={{
              className: "text-background",
              size: "small",
            }}
          />
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
          <LoadingIndicator
            activityIndicatorProps={{
              className: "text-foreground",
              size: "small",
            }}
          />
        ) : (
          <Text>Sign In Anonymously</Text>
        )}
      </Button>
    </View>
  );
}

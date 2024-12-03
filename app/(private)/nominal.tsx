import NominalInput from "@/src/components/shared/NominalInput";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function NominalRoute() {
  const { nominal } = useLocalSearchParams<{ nominal?: string }>();
  const initialValue =
    typeof nominal === "string" ? Number.parseInt(nominal) : undefined;

  return <NominalInput initialValue={initialValue} />;
}

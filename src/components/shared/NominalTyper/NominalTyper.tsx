import { View } from "react-native";
import React from "react";
import NominalText from "./NominalText";
import NominalButtons from "./NominalButtons";

export default function NominalTyper() {
  return (
    <View className="flex-1">
      <NominalText className="flex-1" />
      <NominalButtons />
    </View>
  );
}

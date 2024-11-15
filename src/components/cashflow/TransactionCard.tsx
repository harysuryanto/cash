import React from "react";
import { View, ViewProps } from "react-native";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/src/components/shared/react-native-reusables/Card";

type TransactionCardProps = Omit<ViewProps, "children"> & {
  id: string;
  type: string;
  nominal: string;
  category: string;
  fund: string;
  date: string;
  description: string;
};

export default function TransactionCard({
  id,
  type,
  nominal,
  category,
  fund,
  date,
  description,
  ...rest
}: TransactionCardProps) {
  return (
    <Card className="p-4" {...rest}>
      <View className="flex-row">
        <CardContent className="flex-1 p-0">
          <CardTitle className="text-sm">{description || "-"}</CardTitle>
          <CardDescription
            className={`text-lg font-medium ${
              type === "expense" ? "text-red-500" : "text-green-500"
            }`}
          >
            {type === "expense" ? "-" : ""}
            {nominal}
          </CardDescription>
          <CardDescription>{category}</CardDescription>
        </CardContent>
        <CardContent className="p-0 items-end">
          <CardDescription>{date}</CardDescription>
          <CardDescription>{fund}</CardDescription>
        </CardContent>
      </View>
    </Card>
  );
}

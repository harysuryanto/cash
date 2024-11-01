import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/src/components/shared/react-native-reusables/Card";
import { View } from "react-native";

type TransactionCardProps = {
  type: string;
  nominal: string;
  category: string;
  fund: string;
  date: string;
  description?: string;
};

export default function TransactionCard({
  type,
  nominal,
  category,
  fund,
  date,
  description,
}: TransactionCardProps) {
  return (
    <Card className="p-4">
      <View className="flex-row">
        <CardContent className="flex-1 p-0">
          <CardTitle className="text-sm">{description || "-"}</CardTitle>
          <CardDescription
            className={`font-medium ${
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

import { View } from "react-native";
import React from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { Button } from "../shared/react-native-reusables/Button";
import { Text } from "../shared/react-native-reusables/Text";

export default function TransactionDetailsPage() {
  const { transactionId } = useLocalSearchParams<{ transactionId: string }>();

  return (
    <View>
      <Text>TransactionDetailsPage {transactionId}</Text>
      <Link href={`/(private)/cash-flow/${transactionId}/edit`} asChild>
        <Button>
          <Text>Edit</Text>
        </Button>
      </Link>
    </View>
  );
}

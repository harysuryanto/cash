import { View } from "react-native";
import TransactionsList from "./TransactionsList";

export default function CashFlowPage() {
  return (
    <View className="flex-1 bg-white">
      <TransactionsList />
    </View>
  );
}

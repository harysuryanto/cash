import { View } from "react-native";
import TransactionsList from "./TransactionsList";
import usePageFocusAnalytic from "@/src/hooks/usePageFocusAnalytic";

export default function CashFlowPage() {
  usePageFocusAnalytic();

  return (
    <View className="flex-1 bg-white">
      <TransactionsList />
    </View>
  );
}

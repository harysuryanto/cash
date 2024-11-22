import { Platform, View } from "react-native";
import TransactionsList from "./TransactionsList";
import usePageFocusAnalytic from "@/src/hooks/usePageFocusAnalytic";
import DevInfo from "../shared/DevInfo";

export default function CashFlowPage() {
  usePageFocusAnalytic("cash_flow_page");

  return (
    <View className="flex-1 bg-background">
      <DevInfo enabled={Platform.OS !== "web"} />
      <TransactionsList />
    </View>
  );
}

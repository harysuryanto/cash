import { StyleSheet, View } from "react-native";
import TransactionsList from "./TransactionsList";

export default function CashFlowPage() {
  return (
    <View style={styles.container}>
      <TransactionsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

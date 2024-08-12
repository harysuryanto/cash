import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import TransactionsList from "./TransactionsList";

export default function CashFlowPage() {
  const router = useRouter();

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

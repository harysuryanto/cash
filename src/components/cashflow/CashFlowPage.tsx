import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";
import TransactionsList from "./TransactionsList";

export default function CashFlowPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={router.back} />
        <Appbar.Content title="Cash Flow" />
      </Appbar.Header>
      <TransactionsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

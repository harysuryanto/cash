import AppBar from "@/src/components/shared/AppBar";
import Gap from "@/src/components/shared/Gap";
// import { Cash, CashType } from "@/src/interfaces/cash";
import { colors } from "@/src/utils/colors";
// import { formatCurrency, formatDate } from "@/src/utils/utils/formatter";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
// import uuid from "react-native-uuid";
import { MenuGridTile } from "@/src/components/shared/MenuGridTile";
import { FontAwesome6 } from "@expo/vector-icons";
import { env } from "@/src/utils/utils/env";
import usePageFocusAnalytic from "@/src/hooks/usePageFocusAnalytic";

export default function HomePage() {
  // const getBalance = () => {
  // };

  // const loadCashListFromStorage = async () => {
  // };

  // const getAverageSpendingPermonthPrediction = (cashList: Cash[]): number => {
  // };

  // const groupCashListByMonth = (): string => {
  // };

  // const groupByMonth = (): { [month: string]: Cash[] } => {
  // };

  // const getSpendingPermonth = (): { [month: string]: number } => {
  //   return sums;
  // };

  // const getHighestSpending = (): [string, number] => {
  // };

  // useEffect(() => {
  //   loadCashListFromStorage();
  //   // handleAppUpdates();
  // }, []);

  usePageFocusAnalytic("Home Page");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AppBar />
        <View style={styles.sectionContainer}>
          {/* <Text style={styles.sectionContent}>{getBalance()}</Text> */}
          <Text style={styles.sectionTitle}>Balance</Text>
        </View>
        <View style={styles.sectionContainer}>
          {/* <Text style={styles.sectionContent}>
            {formatCurrency(getHighestSpending()[1])}
          </Text> */}
          {/* <Text style={styles.sectionTitle}>
            Highest spending month of all time is {getHighestSpending()[0]}
          </Text> */}
        </View>
        <View style={{ flexDirection: "row", marginHorizontal: 30, gap: 30 }}>
          <View
            style={[styles.sectionContainer, { flex: 1, marginHorizontal: 0 }]}
          >
            <Text>
              🚧 Prediksi pengeluaran bulan depan berdasarkan rata-rata
              pengeluaran perbulan dalam 12 bulan terakhir
            </Text>
            {/* <Text>
              {groupCashListByMonth()}
              {formatCurrency(
              // getAverageSpendingPermonthPrediction(cashListContext.cashList),
              69000,
            )}
            </Text> */}
          </View>
          <View
            style={[styles.sectionContainer, { flex: 1, marginHorizontal: 0 }]}
          >
            <Text>Cash flow charts here.</Text>
            <Text>Has 3 filters: All, Spending, and Earning.</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", paddingHorizontal: 30 }}>
          <Link href={"/cash-flow"} asChild>
            <TouchableOpacity style={{ flex: 1, borderRadius: 20 }}>
              <MenuGridTile
                title="Track Cash Flow"
                icon={({ size }) => (
                  <FontAwesome6 name="money-bill-transfer" size={size} />
                )}
              />
            </TouchableOpacity>
          </Link>
        </View>
        <Gap height={30} />
        <Text style={{ width: "100%", textAlign: "center" }}>
          v{Constants.expoConfig?.version} - {env.APP_ENV}
        </Text>
        <Gap height={30} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  sectionContainer: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    marginBottom: 30,
    marginHorizontal: 30,
    paddingHorizontal: 10,
    paddingVertical: 50,
  },
  sectionContent: {
    // fontSize: theme.fonts.headlineLarge.fontSize,
    // color: theme.colors.onPrimaryContainer,
    // fontFamily: theme.fonts.bodyMedium.fontFamily,
  },
  sectionTitle: {
    fontSize: 14,
  },
});

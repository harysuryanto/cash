import AppBar from "@/src/components/shared/AppBar";
import Gap from "@/src/components/shared/Gap";
import { CashListContext } from "@/src/contexts/CashContext";
import { Cash, CashType } from "@/src/interfaces/cash";
import { colors } from "@/src/utils/colors";
import { formatCurrency, formatDate } from "@/src/utils/utils/formatter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { MD3Theme, TouchableRipple, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import uuid from "react-native-uuid";
import { MenuGridTile } from "@/src/components/shared/MenuGridTile";
import { FontAwesome6 } from "@expo/vector-icons";

const HomePage = () => {
  const styles = getThemeStyles(useTheme());

  const cashListContext = useContext(CashListContext);

  const getBalance = () => {
    let cashList = cashListContext.cashList;
    let totalCashIn = cashList
      .filter((cash) => cash.type === CashType.In)
      .reduce((sum, current) => sum + current.amount, 0);
    let totalCashOut = cashList
      .filter((cash) => cash.type === CashType.Out)
      .reduce((sum, current) => sum + current.amount, 0);
    return formatCurrency(totalCashIn - totalCashOut);
  };

  const loadCashListFromStorage = async () => {
    try {
      await AsyncStorage.getItem("cashList").then((value: any) => {
        const savedCashList = JSON.parse(value ?? "[]") as Cash[];

        // Prevent loading already loaded data
        if (cashListContext.cashList.length !== 0) return;

        const formatedCashList = savedCashList.map((value) => {
          return {
            ...value,
            id: uuid.v4().toString(),
          } satisfies Cash;
        });
        cashListContext.addCashAll(formatedCashList);
      });
    } catch (e) {}
  };

  // const getAverageSpendingPermonthPrediction = (cashList: Cash[]): number => {
  //   if (cashList.length === 0) return 0;

  //   const spendingsLast12Months = cashList
  //     .filter(({type}) => type === CashType.Out)
  //     .reduce((_previousValue, currentValue, _currentIndex, cashList) => {
  //       const now = new Date();
  //       const date = new Date(currentValue.date);
  //       const aYear = 365;

  //       function daysDiff() {
  //         let days = Math.ceil(
  //           (date.getTime() - now.getTime()) / 1000 / 60 / 60 / 24,
  //         );
  //         return days;
  //       }

  //       if (daysDiff() < aYear) {
  //         // cashList.push(currentValue);
  //         return currentValue;
  //       }
  //     }, []);

  //   const sum = spendingsLast12Months
  //     .map(value => value.amount)
  //     .reduce((accumulator, currentValue) => accumulator + currentValue);

  //   const months = new Set(
  //     spendingsLast12Months.map(({date}) => {
  //       const month = new Date(date).getMonth();
  //       return month;
  //     }),
  //   ).size;

  //   return sum / months;
  // };

  const groupCashListByMonth = (): string => {
    const cashList = cashListContext.cashList.map(
      (cash, index) => `${index + 1} — ${formatDate(new Date(cash.date))}`
    );

    return cashList.join("\n").toString();
  };

  const groupByMonth = (): { [month: string]: Cash[] } => {
    const groups: { [month: string]: Cash[] } = {};

    for (const transaction of cashListContext.cashList) {
      const month = new Date(transaction.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!groups[month]) {
        groups[month] = [];
      }
      groups[month].push(transaction);
    }

    return groups;
  };

  const getSpendingPermonth = (): { [month: string]: number } => {
    const sums: { [month: string]: number } = {};

    for (const transaction of cashListContext.cashList) {
      const month = new Date(transaction.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!sums[month]) {
        sums[month] = 0;
      }
      if (transaction.type === CashType.Out) {
        sums[month] += transaction.amount;
      }
    }

    return sums;
  };

  const getHighestSpending = (): [string, number] => {
    const groups = getSpendingPermonth();
    let highestMonth: string = "";
    let highestAmount: number = -Infinity;
    for (const month in groups) {
      if (groups[month] > highestAmount) {
        highestMonth = month;
        highestAmount = groups[month];
      }
    }
    return [highestMonth, highestAmount];
  };

  useEffect(() => {
    loadCashListFromStorage();
    // handleAppUpdates();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AppBar />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionContent}>{getBalance()}</Text>
          <Text style={styles.sectionTitle}>Balance</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionContent}>
            {formatCurrency(getHighestSpending()[1])}
          </Text>
          <Text style={styles.sectionTitle}>
            Highest spending month of all time is {getHighestSpending()[0]}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginHorizontal: 30, gap: 30 }}>
          <View
            style={[styles.sectionContainer, { flex: 1, marginHorizontal: 0 }]}
          >
            <Text>
              🚧 Prediksi pengeluaran bulan depan berdasarkan rata-rata
              pengeluaran perbulan dalam 12 bulan terakhir
            </Text>
            <Text>
              {groupCashListByMonth()}
              {/* {formatCurrency(
              // getAverageSpendingPermonthPrediction(cashListContext.cashList),
              69000,
            )} */}
            </Text>
          </View>
          <View
            style={[styles.sectionContainer, { flex: 1, marginHorizontal: 0 }]}
          >
            <Text>Cash flow charts here.</Text>
            <Text>Has 3 filters: All, Spending, and Earning.</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", paddingHorizontal: 30 }}>
          <Link href={"cash-flow"} asChild>
            <TouchableRipple
              borderless={true}
              style={{ flex: 1, borderRadius: 20 }}
            >
              <MenuGridTile
                title="Track Cash Flow"
                icon={({ size }) => (
                  <FontAwesome6 name="money-bill-transfer" size={size} />
                )}
              />
            </TouchableRipple>
          </Link>
        </View>
        <Gap height={30} />
        <Text style={{ width: "100%", textAlign: "center" }}>
          v{Constants.expoConfig?.version}
        </Text>
        <Gap height={30} />
      </ScrollView>
    </SafeAreaView>
  );
};

const getThemeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
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
      fontSize: theme.fonts.headlineLarge.fontSize,
      color: theme.colors.onPrimaryContainer,
      fontFamily: theme.fonts.bodyMedium.fontFamily,
    },
    sectionTitle: {
      fontSize: 14,
    },
  });

export default HomePage;

// import { Cash, CashType } from "@/src/interfaces/cash";
// import { formatCurrency, formatDate } from "@/src/utils/utils/formatter";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React, { ComponentType } from "react";
import { TouchableOpacity, View } from "react-native";
// import uuid from "react-native-uuid";
import { ArrowDownUp } from "@/src/utils/react-native-reusables/icons/ArrowDownUp";
import { Text } from "../shared/react-native-reusables/Text";
import { Card } from "../shared/react-native-reusables/Card";
import { cn } from "@/src/utils/utils/utils";
import { formatCurrency } from "@/src/utils/utils/formatter";

function withClassName<T extends { className?: string }>(
  WrappedComponent: ComponentType<T>,
  injectedClassName: string
): ComponentType<T> {
  return function WithClassNameComponent(props: T) {
    const combinedClassName = cn(injectedClassName, props.className);
    return <WrappedComponent {...props} className={combinedClassName} />;
  };
}
const StyledCard = withClassName(Card, "rounded-2xl p-4");

export default function HomePageBody() {
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

  return (
    <View className="gap-4">
      <StyledCard>
        <Text className="text-lg text-center">{formatCurrency(549000000)}</Text>
        <Text className="text-sm text-center">Balance</Text>
      </StyledCard>
      <StyledCard>
        <Text className="text-lg text-center">{formatCurrency(1890000)}</Text>
        <Text className="text-sm text-center">
          Highest spending month of all time
        </Text>
      </StyledCard>
      <View className="flex-row gap-4">
        <StyledCard className="flex-1">
          <Text className="text-lg">{formatCurrency(1328000)}</Text>
          <Text className="text-sm">
            Average spending per month of last 12 months
          </Text>
        </StyledCard>
        <StyledCard className="flex-1">
          <Text className="text-lg">{formatCurrency(1328000)}</Text>
          <Text className="text-sm">
            Prediksi pengeluaran bulan depan berdasarkan rata-rata pengeluaran
            perbulan dalam 12 bulan terakhir
          </Text>
        </StyledCard>
      </View>
      <StyledCard className="flex-1">
        <View className="w-full h-[100] rounded-xl bg-secondary" />
        <Text className="text-sm">
          Cash flow charts here (Has 3 filters: All, Spending, and Earning)
        </Text>
      </StyledCard>
      <Link href={"/cash-flow"} asChild>
        <TouchableOpacity>
          <StyledCard className="gap-2 p-8">
            <ArrowDownUp size={32} className="self-center text-primary" />
            <Text className="text-center">Track Cash Flow</Text>
          </StyledCard>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

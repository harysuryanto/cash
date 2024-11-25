import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import usePageFocusAnalytic from "@/src/hooks/usePageFocusAnalytic";
import AppBar from "@/src/components/shared/AppBar";
import HomePageBody from "./HomePageBody";
import HomePageFooter from "./HomePageFooter";

export default function HomePage() {
  usePageFocusAnalytic("home_page");

  return (
    <ScrollView className="flex-1 bg-background">
      <SafeAreaView className="p-4 gap-4">
        <AppBar />
        <HomePageBody />
        <HomePageFooter />
      </SafeAreaView>
    </ScrollView>
  );
}

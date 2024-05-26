import { Redirect } from "expo-router";
import React from "react";

export default function RootRoute() {
  return <Redirect href="/(private)" />;
}

import React from "react";
// import HomePage from "@/src/components/home/HomePage";
import { Redirect } from "expo-router";

const HomeRoute = () => {
  return <Redirect href="/(private)/cash-flow" />;
  // return <HomePage />;
};

export default HomeRoute;

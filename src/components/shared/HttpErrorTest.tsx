import { View, Text, Button } from "react-native";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@/src/utils/utils/http/http_request";
import useAnalytics from "@/src/hooks/useAnalytics";

export default function HttpErrorTest() {
  const { capture } = useAnalytics();

  const { isFetching, status, error, refetch } = useQuery({
    queryKey: ["HttpErrorTestQuery"],
    queryFn: async () => {
      return await fetchData({
        url: "https",
        data: {
          purpose: "testing",
        },
      });
    },
  });

  useEffect(() => {
    if (!isFetching && error) {
      capture({
        eventType: "error",
        eventDetails: "loading_non_existing_api",
        debug: true,
      });
      console.log("HttpErrorTestQuery error:", error);
    }
  }, [isFetching, error]);

  return (
    <View className="w-full content-start">
      <Text>HttpErrorTest</Text>
      <Text>status {status}</Text>
      <Text>isFetching {String(isFetching)}</Text>
      <Text>error {error?.message}</Text>
      <Button title="Refetch" onPress={() => refetch()} />
    </View>
  );
}

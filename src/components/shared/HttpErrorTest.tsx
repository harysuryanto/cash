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
      await new Promise((resolve) => setTimeout(resolve, 500));

      return await fetchData({
        method: "get",
        // url: "https://Ajsonplaceholder.typicode.com/posts",
        url: "https",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        params: {
          title: "foo",
          body: "bar",
          userId: 1,
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

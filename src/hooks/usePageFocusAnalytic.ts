import { useFocusEffect } from "expo-router";
import useAnalytics from "@/src/hooks/useAnalytics";
import { useCallback } from "react";

export default function usePageFocusAnalytic(pageName: string) {
  const { capture } = useAnalytics();

  useFocusEffect(
    useCallback(() => {
      capture({ eventType: "view", eventDetails: pageName });
    }, [])
  );
}

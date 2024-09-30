import { useFocusEffect } from "expo-router";
import useAnalytics from "@/src/hooks/useAnalytics";
import { useCallback } from "react";

/**
 * Use this hook to capture page view.
 * @param pageName - The name of the page. Use lowercase and snake_case. E.g. "home_page"
 */
export default function usePageFocusAnalytic(pageName: string) {
  const { capture } = useAnalytics();

  useFocusEffect(
    useCallback(() => {
      capture({ eventType: "view", eventDetails: pageName });
    }, [])
  );
}

import { useFocusEffect, usePathname } from "expo-router";
import useAnalytics from "@/src/hooks/useAnalytics";
import { useCallback } from "react";

export default function usePageFocusAnalytic() {
  const pathname = usePathname();
  const { capture } = useAnalytics();

  useFocusEffect(
    useCallback(() => {
      capture({ eventType: "view", eventDetails: pathname });
    }, [])
  );
}

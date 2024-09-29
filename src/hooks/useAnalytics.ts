import { useCallback } from "react";
import { captureEvent, captureEventProps } from "@/src/utils/utils/analytics";

const useAnalytics = () => {
  const capture = useCallback(
    ({
      userId,
      eventType,
      eventDetails,
      sessionId,
      properties,
    }: captureEventProps) => {
      captureEvent({
        userId,
        eventType,
        eventDetails,
        sessionId,
        properties,
      });
    },
    []
  );

  return { capture };
};

export default useAnalytics;

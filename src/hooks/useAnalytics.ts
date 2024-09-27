import { useCallback } from "react";
import { captureEvent, captureEventProps } from "@/src/utils/utils/analytics";

type captureProps = {
  userId?: captureEventProps["userId"];
  eventType: captureEventProps["eventType"];
  eventDetails: captureEventProps["eventDetails"];
};

const useAnalytics = () => {
  const capture = useCallback(
    ({ userId, eventType, eventDetails }: captureProps) => {
      captureEvent({ userId, eventType, eventDetails });
    },
    []
  );

  return { capture };
};

export default useAnalytics;

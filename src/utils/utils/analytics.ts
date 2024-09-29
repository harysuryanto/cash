import fetchData from "@/src/utils/utils/http/http_request";

/**
 * @param eventDetails - Only recieves alphabets and _; e.g. "add_transaction".
 */
export type captureEventProps = {
  userId?: string;
  eventType: "view" | "act";
  eventDetails: string;
  sessionId?: string;
  properties?: Object;
};

/**
 * Logs user activity.
 */
export const captureEvent = async ({
  userId,
  eventType,
  eventDetails,
  sessionId,
  properties,
}: captureEventProps): Promise<void> => {
  try {
    // await fetchData({
    //   method: "post",
    //   url: "https://api.lukehog.com/event/AgX05QGeLPk8QnYe",
    //   data: {
    //     userId: event.userId ?? "unauthenticated", // Required
    //     event: "user_activity", // Required
    //     // sessionId: "",// Optional
    //     properties: event, // Optional
    //   },
    // });

    await fetchData({
      method: "post",
      url: "https://api.lukehog.com/event/AgX05QGeLPk8QnYe",
      data: {
        userId: userId ?? "unauthenticated", // Required
        event: `${eventType}_${eventDetails}`, // Required; Only recieves alphabets and _;
        sessionId, // Optional
        properties, // Optional
      },
    });

    // await fetchData({
    //   method: "post",
    //   url: "https://api.lukehog.com/event/AgX05QGeLPk8QnYe",
    //   data: {
    //     userId: userId ?? "unauthenticated", // Required
    //     event, // Required; Only recieves alphabets and _
    //     sessionId, // Optional
    //     properties, // Optional
    //   },
    // });

    console.log("sent");
  } catch (error) {
    console.log("Analytics error:", error);
  }
};

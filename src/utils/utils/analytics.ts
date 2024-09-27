import fetchData from "@/src/utils/utils/http/http_request";

export type captureEventProps = {
  userId?: string;
  eventType: "view" | "do" | "error";
  eventDetails: string;
};

/**
 * Logs user activity.
 */
export const captureEvent = async (event: captureEventProps): Promise<void> => {
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

    console.log({
      userId: event.userId ?? "unauthenticated", // Required
      event: `${event.eventType}_${event.eventDetails}`, // Required
      // sessionId: "",// Optional
      // properties: event, // Optional
    });

    await fetchData({
      method: "post",
      url: "https://api.lukehog.com/event/AgX05QGeLPk8QnYe",
      data: {
        userId: event.userId ?? "unauthenticated", // Required
        event: `${event.eventType}_${event.eventDetails}`, // Required
        // sessionId: "",// Optional
        // properties: event, // Optional
      },
    });

    console.log("sent");
  } catch (error) {
    console.log("Analytics error:", error);
  }
};

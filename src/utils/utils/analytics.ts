import axios from "axios";

/**
 * @param eventDetails - Only recieves alphabets and _ or just use snake_case. e.g. "add_transaction".
 */
export type captureEventProps = {
  userId?: string;
  eventType: "view" | "act" | "error";
  eventDetails: string;
  sessionId?: string;
  properties?: Object;
  debug?: boolean;
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
  debug = __DEV__,
}: captureEventProps): Promise<void> => {
  try {
    return await axios.post("https://api.lukehog.com/event/gwYJn9BJoeyJvJDx", {
      userId: userId ?? "unauthenticated", // Required
      event: `${eventType}_${eventDetails}`, // Required; Only recieves alphabets and _
      sessionId, // Optional
      properties, // Optional
      debug: Number(debug), // Optional; Defaults to 0
    });
  } catch (error) {
    console.log("🔴 Analytics error:", error);
  }
};

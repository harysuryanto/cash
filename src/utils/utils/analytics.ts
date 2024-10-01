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
  /**
   * To separate analytics for development and production.
   * @default __DEV__
   */
  debug?: boolean;
};

/**
 * Logs user activity.
 *
 * Dashboard: https://lukehog.com/#/4DuS5lnMBxchyjfGBPqNEIqs
 * lukehog.json: {"adminKey":"4DuS5lnMBxchyjfGBPqNEIqs","appId":"gwYJn9BJoeyJvJDx"}
 * sqlite: https://sqlime.org/#https://api.lukehog.com/sqlite/4DuS5lnMBxchyjfGBPqNEIqs
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

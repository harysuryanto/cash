import * as Updates from "expo-updates";
import { ToastAndroid } from "react-native";

/**
 * Check for an over-the-air update, and if available, fetch the update and
 * then reload the JavaScript bundle. If an update is available, a toast
 * message is shown to the user.
 *
 * This function does not throw any errors. If an error occurs, it is caught
 * and swallowed.
 */
export async function doOtaUpdateAndRestartApp() {
  try {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      ToastAndroid.show("Memperbarui aplikasi", ToastAndroid.LONG);
      await Updates.reloadAsync();
    }
  } catch {}
}

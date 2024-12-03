import * as Updates from "expo-updates";
import { ToastAndroid } from "react-native";

export async function checkOtaUpdate() {
  try {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      ToastAndroid.show("Memperbarui aplikasi", ToastAndroid.LONG);
      await Updates.reloadAsync();
    }
  } catch {}
}

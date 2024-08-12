import * as Updates from "expo-updates";
import { Alert, ToastAndroid } from "react-native";

const IS_PROD: boolean = Updates.channel === "production";

export async function checkOtaUpdate() {
  try {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();

      if (IS_PROD) {
        ToastAndroid.show("Memperbarui aplikasi", ToastAndroid.LONG);
        await Updates.reloadAsync();
      } else {
        Alert.alert(
          "Pemberitahuan Dev",
          "Versi Dev baru tersedia. Mulai ulang aplikasi diperlukan untuk menggunakan versi Dev terbaru.",
          [
            { text: "Abaikan", style: "cancel" },
            {
              text: "Mulai ulang",
              isPreferred: true,
              onPress: Updates.reloadAsync,
            },
          ]
        );
      }
    }
  } catch {}
}

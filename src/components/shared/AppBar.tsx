import { StyleSheet, Text, View } from "react-native";
import { UserCircle } from "@/src/utils/react-native-reusables/icons/UserCircle";

const AppBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text className="font-bold text-sky-400" style={styles.greetingText}>
          Have a great day,
        </Text>
        <Text style={styles.name}>Hary! 🌞🌞</Text>
      </View>
      <UserCircle size={40} color="#808e9b" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  greetingContainer: {},
  greetingText: {
    fontSize: 10,
  },
  name: {
    fontSize: 12,
  },
});

export default AppBar;

import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

const AppBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Have a great day,</Text>
        <Text style={styles.name}>Hary! 🌞🌞</Text>
      </View>
      <View style={styles.picture}>
        <Ionicons
          name="person-circle"
          size={styles.picture.width}
          color="#808e9b"
        />
      </View>
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
  picture: {
    backgroundColor: "#d2dae2",
    borderRadius: 20,
    height: 40,
    width: 40,
  },
});

export default AppBar;

import {StyleSheet, Text, View} from 'react-native';

const AppBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Semoga harimu menyenangkan,</Text>
        <Text style={styles.name}>Hary Suryanto</Text>
      </View>
      <View style={styles.picture} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    backgroundColor: 'grey',
    borderRadius: 20,
    height: 40,
    width: 40,
  },
});

export default AppBar;

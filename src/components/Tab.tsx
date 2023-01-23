import {StyleSheet, Text, View} from 'react-native';
import {TouchableRipple, useTheme} from 'react-native-paper';

interface TabProps {
  title: string;
  isActive?: boolean;
  onPress?: () => void;
}

const Tab = ({title, isActive = false, onPress}: TabProps) => {
  const theme = useTheme();

  return (
    <TouchableRipple onPress={onPress} style={{flex: 1, height: 48}}>
      <View style={styles.container}>
        <Text
          style={[
            styles.title,
            {color: isActive ? theme.colors?.primary : theme.colors?.onSurface},
          ]}>
          {title}
        </Text>
        <View
          style={[
            styles.activeIndicator,
            {backgroundColor: isActive ? theme.colors.primary : 'transparent'},
          ]}
        />
      </View>
    </TouchableRipple>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    flex: 1,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  activeIndicator: {
    borderTopStartRadius: 3,
    borderTopEndRadius: 3,
    height: 3,
    width: 30,
  },
});

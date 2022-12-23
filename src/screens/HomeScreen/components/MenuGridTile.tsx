import {Text, View} from 'react-native';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Gap from '../../../components/Gap';
import {colors} from '../../../utils/colors';

type MenuItemProp = {title: string; faIcon: IconDefinition};

export const MenuGridTile = (prop: MenuItemProp) => {
  return (
    <View
      style={{
        alignItems: 'center',
        borderColor: colors.border,
        borderRadius: 20,
        borderWidth: 1,
        flex: 1,
        padding: 40,
      }}>
      <FontAwesomeIcon icon={prop.faIcon} style={{width: 60, height: 60}} />
      <Gap height={15} />
      <Text>{prop.title}</Text>
    </View>
  );
};

import { Text, View } from "react-native";

import Gap from "./Gap";

import { colors } from "../../utils/colors";

type MenuItemProp = {
  title: string;
  icon: (props: { size: number }) => JSX.Element;
};

export const MenuGridTile = ({ icon, title }: MenuItemProp) => {
  return (
    <View
      className={`flex-1 items-center rounded-[20px] border border-[${colors.border}] p-10`}
    >
      {icon({ size: 60 })}
      <Gap height={15} />
      <Text>{title}</Text>
    </View>
  );
};

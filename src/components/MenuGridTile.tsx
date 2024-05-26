import { Text, View } from "react-native";

import Gap from "./Gap";

import { colors } from "../utils/colors";

type MenuItemProp = {
  title: string;
  icon: (props: { size: number }) => JSX.Element;
};

export const MenuGridTile = ({ icon, title }: MenuItemProp) => {
  return (
    <View
      style={{
        alignItems: "center",
        borderColor: colors.border,
        borderRadius: 20,
        borderWidth: 1,
        flex: 1,
        padding: 40,
      }}
    >
      {icon({ size: 60 })}
      <Gap height={15} />
      <Text>{title}</Text>
    </View>
  );
};

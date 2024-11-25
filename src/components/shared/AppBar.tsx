import { Image, View, ViewProps } from "react-native";
import { Text } from "@/src/components/shared/react-native-reusables/Text";
import { UserCircle } from "@/src/utils/react-native-reusables/icons/UserCircle";
import { useAuth } from "@/src/contexts/AuthContext";
import { cn } from "@/src/utils/utils/utils";

type AppBarProps = Omit<ViewProps, "children">;

const AppBar = (props: AppBarProps) => {
  const { user } = useAuth();

  return (
    <View
      {...props}
      className={cn("flex-row items-center justify-between", props.className)}
    >
      <View>
        <Text className="text-lg">Have a great day,</Text>
        <Text className="text-sm">{user?.displayName ?? user?.email}</Text>
      </View>
      {user?.photoURL ? (
        <Image
          source={{ uri: user?.photoURL }}
          className="h-8 w-8 rounded-full"
        />
      ) : (
        <UserCircle size={32} className="text-secondary-foreground" />
      )}
    </View>
  );
};

export default AppBar;

import { Image, TouchableOpacity, View, ViewProps } from "react-native";
import { Text } from "@/src/components/shared/react-native-reusables/Text";
import { UserCircle } from "@/src/utils/react-native-reusables/icons/UserCircle";
import { useAuth } from "@/src/contexts/AuthContext";
import { cn } from "@/src/utils/utils/utils";

type HomePageHeaderProps = Omit<ViewProps, "children">;

const HomePageHeader = (props: HomePageHeaderProps) => {
  const { user, signOut } = useAuth();

  return (
    <View
      {...props}
      className={cn("flex-row items-center justify-between", props.className)}
    >
      <Text className="text-2xl">Cash</Text>
      <View className="flex-row gap-4 items-center">
        <TouchableOpacity onPress={signOut} hitSlop={16}>
          <Text className={`text-muted-foreground`}>Sign Out</Text>
        </TouchableOpacity>
        {user?.photoURL ? (
          <Image
            source={{ uri: user?.photoURL }}
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <UserCircle size={32} className="text-secondary-foreground" />
        )}
      </View>
    </View>
  );
};

export default HomePageHeader;

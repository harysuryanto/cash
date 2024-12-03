import React, { useEffect } from "react";
import { Link, LinkProps, useLocalSearchParams } from "expo-router";
import { Text } from "./react-native-reusables/Text";
import { cn } from "@/src/utils/utils/utils";
import { TouchableOpacity, View } from "react-native";
import { formatCurrency } from "@/src/utils/utils/formatter";

type NominalInputButtonProps = Omit<LinkProps<{}>, "href"> & {
  value?: string;
  onValueChange?: (value?: string) => void;
  placeholder?: string;
};

export default function NominalInputButton({
  value,
  onValueChange = () => {},
  placeholder,
  ...rest
}: NominalInputButtonProps) {
  const { nominal } = useLocalSearchParams<{ nominal?: string }>();

  useEffect(() => {
    onValueChange(nominal);
  }, [nominal]);

  return (
    <Link
      href={{
        pathname: "/(private)/nominal",
        params: { nominal: nominal || value || 0 },
      }}
      asChild
      {...rest}
    >
      <TouchableOpacity>
        <View
          className={cn(
            "web:flex justify-center h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
          )}
        >
          <Text
            className={cn(
              "text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground",
              !(nominal || value) && "text-muted-foreground"
            )}
          >
            {formatCurrency(parseInt(nominal || "0")) ||
              formatCurrency(parseInt(value || "0")) ||
              placeholder}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

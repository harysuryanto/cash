import Ionicons from "@expo/vector-icons/Ionicons";
import React, { forwardRef, useMemo, useState } from "react";
import {
  StyleSheet,
  StyleProp,
  TextInput as DefaultTextInput,
  TextInputProps as DefaultTextInputProps,
  TouchableOpacity,
  View,
  TextStyle,
  NativeSyntheticEvent,
  Text,
  TextInputFocusEventData,
  ViewStyle,
} from "react-native";

export interface TextInputProps extends DefaultTextInputProps {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  icon?: (props: { color: string; size: number }) => JSX.Element;
  error?: string;
  isPassword?: boolean;
  required?: boolean;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  gapBetweenLabelToTextInput?: number;
  gapBetweenErrorToTextInput?: number;
  containerStyle?: StyleProp<ViewStyle>;
  textInputContainerStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
}

const TextInput = forwardRef(
  (
    {
      label,
      labelStyle,
      icon,
      error,
      isPassword,
      required,
      onFocus = () => {},
      gapBetweenLabelToTextInput = 5,
      gapBetweenErrorToTextInput = 5,
      containerStyle,
      textInputContainerStyle,
      textInputStyle,
      ...rest
    }: TextInputProps,
    ref: React.LegacyRef<DefaultTextInput>
  ) => {
    const [passwordHidden, setPasswordHidden] = useState(isPassword);

    const styles = useMemo(
      () =>
        createStyles(
          error !== undefined,
          gapBetweenLabelToTextInput,
          gapBetweenErrorToTextInput
        ),
      [error, gapBetweenLabelToTextInput, gapBetweenErrorToTextInput]
    );
    const finalLabelStyle = [
      styles.label,
      labelStyle,
    ] satisfies StyleProp<TextStyle>;
    const requiredIndicatorStyle = [
      ...finalLabelStyle,
      { color: "red" },
    ] satisfies StyleProp<TextStyle>;
    const finalTextInputContainerStyle = [
      styles.textInputContainer,
      textInputContainerStyle,
    ] satisfies StyleProp<ViewStyle>;
    const finalTextInputStyle = [
      styles.textInput,
      textInputStyle,
      icon && { paddingLeft: 8 },
      isPassword && { paddingRight: 8 },
    ] satisfies StyleProp<TextStyle>;

    return (
      <View style={containerStyle}>
        {label ? (
          <View style={styles.labelContainer}>
            <Text numberOfLines={1} style={finalLabelStyle}>
              {label}
            </Text>
            {required ? (
              <Text style={requiredIndicatorStyle}> *</Text>
            ) : undefined}
          </View>
        ) : undefined}
        <View style={finalTextInputContainerStyle}>
          {icon ? (
            <View style={styles.iconContainer}>
              {icon({ color: "lightgreen", size: 18 })}
            </View>
          ) : (
            <></>
          )}
          <DefaultTextInput
            autoCorrect={false}
            onFocus={onFocus}
            secureTextEntry={passwordHidden}
            placeholderTextColor={"grey"}
            {...rest}
            ref={ref}
            style={finalTextInputStyle}
          />
          {isPassword && (
            <TouchableOpacity
              onPress={() => setPasswordHidden(!passwordHidden)}
              style={styles.toggelHidePasswordButton}
            >
              <Ionicons
                name={passwordHidden ? "eye-outline" : "eye-off-outline"}
                size={16}
                color={error ? "red" : "lightgreen"}
              />
            </TouchableOpacity>
          )}
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }
);

const createStyles = (
  isError: boolean,
  gapBetweenLabelToTextInput: number,
  gapBetweenErrorToTextInput: number
) =>
  StyleSheet.create({
    labelContainer: {
      flexDirection: "row",
      marginBottom: gapBetweenLabelToTextInput,
    },
    label: {
      color: "grey",
      // fontFamily: 'Poppins',
      fontSize: 12,
      fontWeight: "500",
      lineHeight: 18,
    },
    textInputContainer: {
      alignItems: "stretch",
      borderColor: `${isError ? "red" : "lightgreen"}4D`,
      borderRadius: 8,
      borderWidth: 1,
      flexDirection: "row",
    },
    iconContainer: {
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 8,
    },
    textInput: {
      color: "black",
      flex: 1,
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      fontWeight: "500",
      lineHeight: 21,
      paddingHorizontal: 15,
      paddingVertical: 12,
    },
    toggelHidePasswordButton: {
      justifyContent: "center",
      paddingRight: 8,
    },
    error: {
      color: "red",
      // fontFamily: 'Poppins',
      fontSize: 12,
      fontWeight: "400",
      marginTop: gapBetweenErrorToTextInput,
    },
  });

export default TextInput;

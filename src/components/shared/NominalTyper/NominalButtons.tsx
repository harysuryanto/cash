import { View, ViewProps } from "react-native";
import React from "react";
import NominalButton from "./NominalButton";
import { useNominalTyper } from "./NominalTyperContext";
import { cn } from "@/src/utils/utils/utils";
import { Delete } from "@/src/utils/react-native-reusables/icons/Delete";

type NominalButtonsProps = ViewProps;

export default function NominalButtons({
  className,
  ...rest
}: NominalButtonsProps) {
  const {
    nominal,
    setNominal,
    storedValue,
    setStoredValue,
    currentOperation,
    setCurrentOperation,
  } = useNominalTyper();

  const calculateResult = () => {
    if (storedValue === null || currentOperation === null) return nominal;

    let result = storedValue;
    switch (currentOperation) {
      case "+":
        result += nominal;
        break;
      case "-":
        result -= nominal;
        break;
      case "*":
        result *= nominal;
        break;
      case "/":
        if (nominal !== 0) {
          result /= nominal;
        }
        break;
    }
    return result;
  };

  const handleDigit = (digit: string) => {
    const currentValue = nominal.toString();

    switch (digit) {
      case "clear":
        setNominal(0);
        setStoredValue(null);
        setCurrentOperation(null);
        break;
      case "backspace":
        setNominal(
          currentValue.length > 1 ? parseInt(currentValue.slice(0, -1)) : 0
        );
        break;
      default:
        if (nominal === 0) {
          setNominal(parseInt(digit));
        } else {
          setNominal(parseInt(currentValue + digit));
        }
    }
  };

  const handleOperation = (operation: string) => {
    if (currentOperation !== null && storedValue !== null) {
      // If there's an existing operation, calculate the result
      const result = calculateResult();
      setNominal(0);
      setStoredValue(result);
      setCurrentOperation(operation);
    } else {
      // Start a new operation
      setStoredValue(nominal);
      setCurrentOperation(operation);
      setNominal(0);
    }
  };

  const handleOnSave = () => {};

  return (
    <View className={cn("p-2", className)} {...rest}>
      <View className="flex-row">
        <NominalButton digit="7" onPress={() => handleDigit("7")} />
        <NominalButton digit="8" onPress={() => handleDigit("8")} />
        <NominalButton digit="9" onPress={() => handleDigit("9")} />
        <NominalButton
          digit="÷"
          onPress={() => handleOperation("/")}
          variant="primary"
        />
      </View>
      <View className="flex-row">
        <NominalButton digit="4" onPress={() => handleDigit("4")} />
        <NominalButton digit="5" onPress={() => handleDigit("5")} />
        <NominalButton digit="6" onPress={() => handleDigit("6")} />
        <NominalButton
          digit="×"
          onPress={() => handleOperation("*")}
          variant="primary"
        />
      </View>
      <View className="flex-row">
        <NominalButton digit="1" onPress={() => handleDigit("1")} />
        <NominalButton digit="2" onPress={() => handleDigit("2")} />
        <NominalButton digit="3" onPress={() => handleDigit("3")} />
        <NominalButton
          digit="-"
          onPress={() => handleOperation("-")}
          variant="primary"
        />
      </View>
      <View className="flex-row">
        <NominalButton digit="0" onPress={() => handleDigit("0")} />
        <NominalButton digit="000" onPress={() => handleDigit("000")} />
        <NominalButton digit="◀" onPress={() => handleDigit("backspace")}>
          <Delete size={24} className="text-primary" />
        </NominalButton>
        <NominalButton
          digit="+"
          onPress={() => handleOperation("+")}
          variant="primary"
        />
      </View>
      <View className="flex-row">
        <NominalButton
          digit="Save"
          onPress={handleOnSave}
          variant="primary"
          className="flex-[3] aspect-[3/1]"
        />
        <NominalButton
          digit="="
          variant="primary"
          onPress={() => {
            if (currentOperation !== null && storedValue !== null) {
              const result = calculateResult();
              setNominal(result);
              setStoredValue(null);
              setCurrentOperation(null);
            }
          }}
        />
      </View>
    </View>
  );
}

import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  TouchableOpacityProps,
} from "react-native";
import React from "react";

interface Props extends TouchableOpacityProps {
  title: string;
}

const PrimaryButton = ({ title, ...props }: Props) => {
  return (
    <>
      <TouchableOpacity
        {...props}
        className="w-full p-3 my-3 text-center bg-yellow-500 rounded-3xl "
      >
        <Text className="font-medium text-center text-white">{title}</Text>
      </TouchableOpacity>
    </>
  );
};

export default PrimaryButton;

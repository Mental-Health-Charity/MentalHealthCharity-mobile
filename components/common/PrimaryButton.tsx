import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import React from "react";

type Props = {
  title: string;
  onPress: (event: any) => any;
};

const PrimaryButton = (props: Props) => {
  const { title, onPress } = props;
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        className="w-full bg-yellow-500 p-3 text-center rounded-2xl mb-3 "
      >
        <Text className="text-white">{title}</Text>
      </TouchableOpacity>
    </>
  );
};

export default PrimaryButton;

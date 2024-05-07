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
        className="w-full p-3 my-3 text-center bg-yellow-500 rounded-3xl "
      >
        <Text className="font-medium text-center text-white">{title}</Text>
      </TouchableOpacity>
    </>
  );
};

export default PrimaryButton;

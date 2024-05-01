import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  status: string;
  onPress: any;
};

const ArticleStatusButton = ({ status, onPress }: Props) => {
  return (
    <>
      <TouchableOpacity className="mr-3" onPress={onPress}>
        <Text className="text-xl font-bold text-black">{status}</Text>
      </TouchableOpacity>
    </>
  );
};

export default ArticleStatusButton;

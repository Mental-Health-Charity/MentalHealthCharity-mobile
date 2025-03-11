import React from "react";
import { TouchableOpacity, Image, View } from "react-native";

type Props = {
  isModalVisible: () => void;
  //   profileImage: string;
};

const OpenProfileModalButton = ({ isModalVisible }: Props) => {
  return (
    <TouchableOpacity onPress={isModalVisible}>
      <Image
        source={require("../../assets/user.png")}
        style={{ width: 40, height: 40, margin: 16 }}
      ></Image>
    </TouchableOpacity>
  );
};

export default OpenProfileModalButton;

import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import {} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const Header = (props: Props) => {
  const navigation = useNavigation();
  return (
    <View className="flex items-center justify-center w-full h-16 ">
      <Image
        source={require("../../assets/logo.png")}
        className="w-48 h-16"
        resizeMode="contain"
      />
    </View>
  );
};

export default Header;

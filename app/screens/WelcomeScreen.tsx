import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../components/Router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

type Props = {};

const WelcomeScreen = (props: Props) => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  return (
    <View>
      <StatusBar style="light" />
      <Image
        className="absolute w-full h-full"
        source={require("../../assets/herowave.png")}
      />
      <View className="fixed flex justify-around w-full h-full pt-24 pb-10">
        <View className="flex items-center">
          <Image
            source={require("../../assets/logo.png")}
            className="w-72 h-[64px]"
            resizeMode="contain"
          />
        </View>
        <View className="flex mx-auto items-center w-[75%]">
          <PrimaryButton
            title="Dołącz do nas!"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

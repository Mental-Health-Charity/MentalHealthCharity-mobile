import {
  Text,
  View,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const Register = (props: Props) => {
  const handleSubmit = () => {
    console.log("Submit");
  };
  return (
    <View className="w-full h-full bg-white">
      <StatusBar style="light" />
      <Image
        className="absolute w-full h-full"
        source={require("../../assets/background.png")}
      />
      <View className="flex justify-around w-full h-full pt-24 pb-10">
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-5xl font-bold tracking-wider text-white"
          >
            Zarejstruj się
          </Animated.Text>
        </View>
        <View className="flex items-center mx-4 space-y-4">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="w-full p-5 bg-gray-300 rounded-2xl"
          >
            <TextInput placeholder="Email" placeholderTextColor={"grey"} />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="w-full p-5 bg-gray-300 rounded-2xl"
          >
            <TextInput
              placeholder="Nazwa Użytkownika"
              placeholderTextColor={"grey"}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="w-full p-5 bg-gray-300 rounded-2xl"
          >
            <TextInput
              placeholder="Hasło"
              placeholderTextColor={"grey"}
              secureTextEntry
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="w-full p-5 bg-gray-300 rounded-2xl"
          >
            <TextInput
              placeholder="Potwierdź hasło"
              placeholderTextColor={"grey"}
              secureTextEntry
            />
          </Animated.View>
          <Animated.View
            className="w-full mt-6"
            entering={FadeInDown.delay(400).duration(1000).springify()}
          >
            <PrimaryButton onPress={handleSubmit} title="Zaloguj się" />
          </Animated.View>
        </View>
        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}
        >
          <Text className="text-gray-400 text-center ">
            Nie masz konta?
            <TouchableOpacity>
              <Text className="text-blue-400 ">Zarejestruj się</Text>
            </TouchableOpacity>
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default Register;

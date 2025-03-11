import {
  Text,
  View,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
  RCTNativeAppEventEmitter,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useAuth } from "../contexts/authContext";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../components/Router";
import Toast from "react-native-root-toast";
import { errorToast } from "../utils/toasts";
type MyValues = {
  username: string;
  password: string;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

interface LoginProps {
  navigation: LoginScreenNavigationProp;
}

const loginValidationSchema = yup.object().shape({
  username: yup.string().required("Nazwa użytkownika jest wymagana"),
  password: yup.string().required("Proszę podać hasło"),
});

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const { login, user, error } = useAuth();

  const initialValues: MyValues = { username: "", password: "" };
  return (
    <View className="w-full h-full bg-white">
      <StatusBar style="light" />
      <Image
        className="absolute w-full h-full"
        source={require("../../assets/herowave.png")}
      />
      <View className="flex justify-around w-full h-full pt-24 pb-10">
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-5xl font-bold tracking-wider text-white"
          >
            Zaloguj się
          </Animated.Text>
        </View>
        <View className="fixed flex items-center mx-4 space-y-4">
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={initialValues}
            onSubmit={(values) => {
              if (!values.username || !values.password) {
                errorToast("Proszę uzupełnić wszystkie pola");
              } else {
                login(values);
              }
            }}
          >
            {({ handleChange, handleSubmit, handleBlur, values }) => (
              <>
                <Animated.View
                  entering={FadeInDown.duration(1000).springify()}
                  className="w-full p-5 bg-gray-300 rounded-2xl"
                >
                  <TextInput
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                    placeholder="Nazwa użytkownika"
                    placeholderTextColor={"grey"}
                  />
                </Animated.View>

                <Animated.View
                  entering={FadeInDown.delay(200).duration(1000).springify()}
                  className="w-full p-5 mt-2 bg-gray-300 rounded-2xl"
                >
                  <TextInput
                    placeholder="Hasło"
                    placeholderTextColor={"grey"}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry
                  />
                </Animated.View>
                <PrimaryButton
                  title="Zaloguj się"
                  onPress={() => handleSubmit()}
                />
              </>
            )}
          </Formik>

          <Animated.View
            className="w-full "
            entering={FadeInDown.delay(400).duration(1000).springify()}
          ></Animated.View>
        </View>
        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}
        >
          <Text className="text-center text-gray-400 ">
            Nie masz konta?
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text className="my-auto text-blue-400 ">Zarejestruj się</Text>
            </TouchableOpacity>
          </Text>
          <Text className="text-center text-gray-400 ">
            Nie pamiętasz hasło?
            <TouchableOpacity
              onPress={() => navigation.navigate("ChangePassword")}
            >
              <Text className="my-auto text-blue-400 ">Zresetuj hasło</Text>
            </TouchableOpacity>
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default Login;

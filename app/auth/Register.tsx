import {
  Text,
  View,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
import * as yup from "yup";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { Field, Formik } from "formik";
import { useAuth } from "../contexts/authContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../components/Router";
import { Toast } from "toastify-react-native";
type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Register"
>;

type RegisterValues = {
  full_name: string;
  email: string;
  password: string;
};

type RegisterProps = {
  navigation: RegisterScreenNavigationProp;
};

const registerValidationSchema = yup.object().shape({
  full_name: yup.string().required("Proszę podać imię i nazwisko"),
  email: yup.string().required("Proszę podać email"),
  password: yup.string().required("Proszę wprowadzić hasło"),
});

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const { signIn, user, error } = useAuth();
  const initialValues: RegisterValues = {
    full_name: "",
    email: "",
    password: "",
  };

  return (
    <KeyboardAvoidingView className="w-full h-full bg-white">
      <StatusBar style="light" />
      <Image
        className="absolute w-full h-full"
        source={require("../../assets/herowave.png")}
      />
      <View className="fixed flex justify-around w-full h-full pt-24 pb-10">
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-5xl font-bold tracking-wider text-white"
          >
            Zarejstruj się
          </Animated.Text>
        </View>
        <Formik
          validationSchema={registerValidationSchema}
          initialValues={initialValues}
          onSubmit={(values) => {
            if (!values.full_name || !values.email || !values.password) {
              Toast.error("Proszę uzupełnić wszystkie pola", "top");
              return;
            }

            try {
              signIn(values);
            } catch (error) {
              Toast.error(
                "Rejstracja nie powiodła się, spróbuj ponownie",
                "top"
              );
            }
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values }) => (
            <>
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="w-full p-5 bg-gray-300 rounded-2xl"
              >
                <TextInput
                  onChangeText={handleChange("full_name")}
                  onBlur={handleBlur("full_name")}
                  value={values.full_name}
                  placeholder="Imię i nazwisko"
                  placeholderTextColor={"grey"}
                />
              </Animated.View>

              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="w-full p-5 bg-gray-300 rounded-2xl"
              >
                <TextInput
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder="email"
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
                title="Zarejestruj się"
                onPress={() => {
                  console.log("hello");
                  handleSubmit();
                }}
              />
            </>
          )}
        </Formik>

        <Animated.View
          className={"flex justify-around items-center"}
          entering={FadeInDown.delay(600).duration(1000).springify()}
        >
          <Text className="text-center text-gray-400 ">
            Masz już konto?
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="m-auto text-blue-400 ">Zaloguj się</Text>
            </TouchableOpacity>
          </Text>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

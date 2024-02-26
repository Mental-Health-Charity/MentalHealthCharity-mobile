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
import FormField from "../../components/common/FormField";

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Register"
>;

type RegisterValues = {
  full_name: string;
  email: string;
  password: string;
  username: string;
};

type RegisterProps = {
  navigation: RegisterScreenNavigationProp;
};

const registerValidationSchema = yup.object().shape({
  fullName: yup.string().required("Proszę podać imię i nazwisko"),
  email: yup.string().required("Proszę podać email"),
  password: yup.string().required("Proszę wprowadzić hasło"),
  confirmPassword: yup.string().required("Proszę wprowadzić hasło ponownie"),
});

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const { signIn, user, error } = useAuth();
  const initialValues: RegisterValues = {
    full_name: "",
    email: "",
    username: "",
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
            signIn(values);
          }}
        >
          {({ handleSubmit }) => (
            <>
              <Field
                component={FormField}
                placeholder="Imię i nazwosko"
                //value={values.full_name}
                name="full_name"
              />
              <Field
                component={FormField}
                placeholder="email"
                name="email"
                //value={values.email}
              />
              <Field
                component={FormField}
                placeholder="username"
                name="username"
                //value={values.username}
              />
              <Field
                component={FormField}
                placeholder="Hasło"
                name="password"
                secureTextEntry
                //value={values.password}
              />
              <PrimaryButton
                title="Zarejestruj się"
                onPress={() => handleSubmit()}
              />
            </>
          )}
        </Formik>
        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}
        >
          <Text className="text-center text-gray-400 ">
            Nie masz konta?
            <TouchableOpacity>
              <Text className="text-blue-400 ">Zarejestruj się</Text>
            </TouchableOpacity>
          </Text>
        </Animated.View>
        <Animated.View
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

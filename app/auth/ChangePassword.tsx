import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import PrimaryButton from "../../components/common/PrimaryButton";
import { Toast } from "toastify-react-native";

type Props = {};

const changePasswordValidationSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const ChangePassword = (props: Props) => {
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
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
            Zresetuj hasło
          </Animated.Text>
        </View>
        <View className="fixed flex items-center mx-4 space-y-4">
          <Formik
            validationSchema={changePasswordValidationSchema}
            initialValues={initialValues}
            onSubmit={(values) => {
              if (!values.password || !values.confirmPassword) {
                Toast.error("Proszę uzupełnić wszystkie pola", "top");
                return;
              }

              try {
                console.log(values);
              } catch (error) {
                Toast.error(
                  "Logowanie nie powiodło się, spróbuj ponownie",
                  "top"
                );
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
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    placeholder="Hasło"
                    placeholderTextColor={"grey"}
                  />
                </Animated.View>

                <Animated.View
                  entering={FadeInDown.delay(200).duration(1000).springify()}
                  className="w-full p-5 mt-2 bg-gray-300 rounded-2xl"
                >
                  <TextInput
                    placeholder="Potwierdź hasło"
                    placeholderTextColor={"grey"}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.password}
                    secureTextEntry
                  />
                </Animated.View>
                <PrimaryButton title="Zresetuj hasło" onPress={handleSubmit} />
              </>
            )}
          </Formik>

          <Animated.View
            className="w-full "
            entering={FadeInDown.delay(400).duration(1000).springify()}
          ></Animated.View>
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;

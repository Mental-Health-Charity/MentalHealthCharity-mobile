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
  email: yup.string().required("Email is required"),
});

const ChangePassword = (props: Props) => {
  const initialValues = {
    email: "",
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
              if (!values.email) {
                Toast.error("Proszę uzupełnić wszystkie pola", "top");
                return;
              }

              try {
                console.log(values);
              } catch (error) {
                Toast.error(
                  "Nie można wysłać wiadomości. Spróbuj ponownie",
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
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholder="Hasło"
                    placeholderTextColor={"grey"}
                  />
                </Animated.View>
                <PrimaryButton
                  title="Wyślij link do resetu"
                  onPress={handleSubmit}
                />
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

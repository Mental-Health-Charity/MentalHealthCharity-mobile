import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Animated, { FadeInDown } from "react-native-reanimated";
import PrimaryButton from "../common/PrimaryButton";

type Props = {};

const sendRequestSchema = yup.object().shape({
  fullName: yup.string().required("Proszę podać imię i nazwisko"),
  email: yup.string().required("Proszę podać email"),
  message: yup.string().required("Proszę wprowadzić hasło"),
});

const sendChatRequest = (props: Props) => {
  const userSentMessage = useState(false);
  const initialValues = {
    fullName: "",
    email: "",
    message: "",
  };
  return (
    <View>
      if(!userSentMessage)
      {
        <Text className="m-auto text-xl font-bold text-black">
          Wysłano prośbe o czat, proszę czekać na potwierdzenie
        </Text>
      }
      :
      {
        <Formik
          initialValues={initialValues}
          onSubmit={() => console.log("request sent")}
        >
          {({ handleSubmit, handleChange, handleBlur, values }) => (
            <>
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="w-full p-5 bg-gray-300 rounded-2xl"
              >
                <TextInput
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                  placeholder="Imie i nazwisko"
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
                  placeholder="emial"
                  placeholderTextColor={"grey"}
                />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="w-full h-16 p-5 bg-gray-300 rounded-2xl"
              >
                <TextInput
                  onChangeText={handleChange("message")}
                  onBlur={handleBlur("message")}
                  value={values.message}
                  placeholder="Treść wiadomości"
                  placeholderTextColor={"grey"}
                />
              </Animated.View>
              <PrimaryButton title="Wyślij prośbę" onPress={handleSubmit} />
            </>
          )}
        </Formik>
      }
    </View>
  );
};

export default sendChatRequest;

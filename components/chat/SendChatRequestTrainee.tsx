import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Animated, { FadeInDown } from "react-native-reanimated";
import PrimaryButton from "../common/PrimaryButton";
import { Picker } from "@react-native-picker/picker";
import { successToast } from "../../app/utils/toasts";
import { Toast } from "toastify-react-native";

type Props = {};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const sendRequestSchema = yup.object().shape({
  age: yup.string().required("Proszę podać wiek, pole wymagane"),
  description: yup.string(),
  phone: yup
    .string()
    .matches(phoneRegExp, "Niepoprawny numer telefonu")
    .required("Pole wymagane"),
  reason: yup.string().required("Pole wymagane"),
  source: yup.string().required("Pole wymagane"),
  did_help: yup.string().required("Pole wymagane"),
  education: yup.string(),
});

const SendChatRequest = (props: Props) => {
  const userSentMessage = useState(false);
  const initialValues = {
    form_type_id: 2,
    age: 0,
    education: "",
    phone: "",
    reason: "",
    source: "",
    did_help: "",
  };
  return (
    <View className="m-5 bg-[#f3f7fe]">
      {!userSentMessage ? (
        <Text className="m-auto text-xl font-bold text-black">
          Wysłano prośbe o czat, proszę czekać na potwierdzenie
        </Text>
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={() => {
            console.log("request sent");
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values }) => (
            <View className="m-5">
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="w-full p-5 mt-3 bg-gray-300 rounded-2xl"
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
                className="w-full p-5 mt-3 bg-gray-300 rounded-2xl"
              >
                <TextInput
                  onChangeText={handleChange("education")}
                  onBlur={handleBlur("education")}
                  value={values.education}
                  placeholder="education"
                  placeholderTextColor={"grey"}
                />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="w-full h-16 p-5 mt-3 bg-gray-300 rounded-2xl"
              >
                <TextInput
                  onChangeText={handleChange("reason")}
                  onBlur={handleBlur("reason")}
                  value={values.reason}
                  placeholder="Powód dołączenia"
                  placeholderTextColor={"grey"}
                />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="w-full h-16 p-5 mt-3 bg-gray-300 rounded-2xl"
              >
                <TextInput
                  onChangeText={handleChange("reason")}
                  onBlur={handleBlur("reason")}
                  value={values.reason}
                  placeholder="Powód dołączenia"
                  placeholderTextColor={"grey"}
                />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="w-full p-5 mt-3 bg-gray-300 rounded-2xl"
              >
                <TextInput
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                  placeholder="Preferuję kontakt"
                />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="w-full p-5 mt-3 bg-gray-300 rounded-2xl"
              >
                <Picker
                  selectedValue={values.source}
                  onValueChange={handleChange}
                  mode="dropdown"
                  placeholder="Skąd się o nas dowiedziałeś?"
                >
                  <Picker.Item label="Facebook" value="Facebook" />
                  <Picker.Item label="Tik-Tok" value="Tik-Tok" />
                  <Picker.Item label="Instagram" value="Instagram" />
                  <Picker.Item label="Od znajomego" value="Od znajomego" />
                  <Picker.Item label="Inny" value="Inny" />
                </Picker>
              </Animated.View>
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="w-full p-5 mt-3 bg-gray-300 rounded-2xl"
              >
                <Picker
                  selectedValue={values.source}
                  onValueChange={handleChange}
                  mode="dropdown"
                  placeholder="Skąd się o nas dowiedziałeś?"
                >
                  <Picker.Item
                    label="Tak, udzielałem/am profesjonalnie"
                    value="Tak, udzielałem/am profesjonalnie"
                  />
                  <Picker.Item
                    label="Tak, udzielałem/am nieprofesjonalnie"
                    value="Tak, udzielałem/am nieprofesjonalnie"
                  />
                  <Picker.Item
                    label="Nie udzielałem/am"
                    value="Nie udzielałem/am"
                  />
                </Picker>
              </Animated.View>

              <PrimaryButton title="Wyślij prośbę" onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      )}
    </View>
  );
};

export default SendChatRequest;

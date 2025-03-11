import { View, Text, TextInput, SectionList } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Animated, { FadeInDown } from "react-native-reanimated";
import PrimaryButton from "../common/PrimaryButton";
import { successToast } from "../../app/utils/toasts";
import { Toast } from "toastify-react-native";
import { Picker } from "@react-native-picker/picker";

type Props = {};

const sendRequestSchema = yup.object().shape({
  age: yup.string().required("Proszę podać wiek, pole wymagane"),
  contact: yup.string().required("Pole wymagane"),
  problem: yup.string().required("Pole wymagane"),
  problem_description: yup.string().required("Pole wymagane"),
  how_you_found_us: yup.string(),
});

const SendChatRequest = (props: Props) => {
  const userSentMessage = useState(false);
  const initialValues = {
    form_type_id: 3,
    age: 0,
    contact: "",
    problem: "",
    problem_description: "",
    how_you_found_us: "",
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
                <Text
                  onChange={handleChange(age)}
                  onBlur={handleBlur("age")}
                  value={values.age}
                  placeholder="Wiek"
                  placeholderTextColor={"grey"}
                />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="w-full p-5 mt-3 bg-gray-300 rounded-2xl"
              >
                <Picker
                  selectedValue={values.contact}
                  onValueChange={handleChange}
                  mode="dropdown"
                  placeholder="Preferuję kontakt"
                >
                  <Picker.Item label="Phone" value="phone" />
                  <Picker.Item label="Email" value="email" />
                </Picker>
              </Animated.View>
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="w-full h-16 p-5 mt-3 bg-gray-300 rounded-2xl"
              >
                <Picker
                  selectedValue={values.problem}
                  onValueChange={handleChange}
                  mode="dropdown"
                  placeholder="Wybierz rodzaj problemu"
                >
                  <Picker.Item label="Phone" value="phone" />
                  <Picker.Item label="Email" value="email" />
                </Picker>
              </Animated.View>
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="w-full p-5 mt-3 bg-gray-300 rounded-2xl"
              >
                <Text
                  onChange={handleChange("problem_description")}
                  onBlur={handleBlur("proplem_description")}
                  value={values.problem_description}
                  placeholder="Opisz problem"
                  placeholderTextColor={"grey"}
                />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="w-full p-5 mt-3 bg-gray-300 rounded-2xl"
              >
                <Text
                  onChange={handleChange("how_you_found_us")}
                  onBlur={handleBlur("how_you_found_us")}
                  value={values.how_you_found_us}
                  placeholder="Jak nas znalazłeś?"
                  placeholderTextColor={"grey"}
                />
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

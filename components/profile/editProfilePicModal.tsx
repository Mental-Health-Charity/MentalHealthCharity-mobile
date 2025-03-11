import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { Dispatch, SetStateAction, useState } from "react";
import { PublicProfile } from "../../app/contexts/authContext";
import * as yup from "yup";
import { Formik } from "formik";

import React from "react";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialIcons";
import PrimaryButton from "../common/PrimaryButton";
import { setChatAvatar } from "./lib/setChatAvatar";
import FormField from "../common/FormField";

interface ChangePictureModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
}

const chatAvatarValidationSchema = yup.object().shape({
  avatar: yup.string().url("Podany URL nie jest poprawny"),
});

const ChangePictureModal = ({
  setIsModalOpen,

  isModalOpen,
}: ChangePictureModalProps) => {
  const [imageUri, setImageUri] = useState(null);

  return (
    <Modal isVisible={isModalOpen} className="bg-[#f3f7fe]">
      <TouchableOpacity
        className="absolute top-3 right-3"
        onPress={() => setIsModalOpen(false)}
      >
        <Icon name="close" size={24} color="#333" />
      </TouchableOpacity>
      <View className="flex flex-col justify-around gap-5 m-5">
        <Text className="mb-3 text-lg font-bold">Edytuj zdjęcie profilowe</Text>
        <Formik
          initialValues={{ avatar: "" }}
          onSubmit={(values) => setChatAvatar(values.avatar)}
          validationSchema={chatAvatarValidationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View>
              <Text>Podaj link do zdjęcia:</Text>
              <TextInput
                onChangeText={handleChange("avatar")}
                onBlur={handleBlur("avatar")}
                value={values.avatar}
                className="p-3 mb-12 border rounded"
              />
              {errors.avatar && (
                <Text className="text-red-500">{errors.avatar}</Text>
              )}
              {imageUri && (
                <Image
                  source={{ uri: imageUri }}
                  className="mb-3 h-52 w-52 rounded-3xl"
                  resizeMode="cover"
                />
              )}
              <PrimaryButton title="Ustaw zdjęcie" onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      </View>
    </Modal>
  );
};

export default ChangePictureModal;

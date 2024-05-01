import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { Dispatch, SetStateAction, useState } from "react";
import { PublicProfile } from "../../app/contexts/authContext";
// import * as yup from "yup";
// import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialIcons";
import PrimaryButton from "../common/PrimaryButton";
import { setChatAvatar } from "./lib/setChatAvatar";

interface ChangePictureModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
}

const ChangePictureModal = ({
  setIsModalOpen,

  isModalOpen,
}: ChangePictureModalProps) => {
  const [image, setImage] = useState<any>();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  console.log("Image: ", image);
  return (
    <Modal
      isVisible={isModalOpen}
      className="bg-slate-200 w-5/6 self-center flex items-center
    justify-around"
    >
      <TouchableOpacity
        className="absolute top-3 right-3"
        onPress={() => setIsModalOpen(false)}
      >
        <Icon name="close" size={24} color="#333" />
      </TouchableOpacity>
      <Text className="font-bold text-lg">Edytuj zdjęcie profilowe</Text>
      <PrimaryButton
        title="Wybierz zdjecie"
        onPress={() => {
          pickImage(), console.log("Image: ", image);
        }}
      />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <View className="w-5/6">
        <PrimaryButton
          title="Ustaw zdjęcie"
          onPress={() => setChatAvatar(image)}
        />
      </View>

      <TouchableOpacity
        className="absolute top-3 right-10"
        onPress={() => setIsModalOpen(false)}
      ></TouchableOpacity>
    </Modal>
  );
};

export default ChangePictureModal;

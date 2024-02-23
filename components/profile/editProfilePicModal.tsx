import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Dispatch, SetStateAction } from "react";
import { PublicProfile } from "../../app/contexts/authContext";
import React from "react";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialIcons";
import PrimaryButton from "../common/PrimaryButton";

interface ChangePictureModalProps {
  setEditedProfile?: any;
  editedProfile?: PublicProfile | undefined;
  setIsModalOpen: any;
  handleEditProfile?: () => Promise<void>;
  isModalOpen: boolean;
}

const ChangePictureModal = ({
  editedProfile,
  setEditedProfile,
  setIsModalOpen,
  handleEditProfile,
  isModalOpen,
}: ChangePictureModalProps) => {
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
      <TextInput
        className="rounded-xl border-2 border-gray-300 bg-gray-50 w-5/6 p-3"
        placeholder="Wklej URL zdjęcia profilowego"
        placeholderTextColor={"grey"}
      />
      <View className="w-5/6">
        <PrimaryButton
          title="Ustaw zdjęcie"
          onPress={() => console.log("Hello")}
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

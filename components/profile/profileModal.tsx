import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialIcons";
import PrimaryButton from "../common/PrimaryButton";
import ChangePictureModal from "./editProfilePicModal";
import { PublicProfile, useAuth } from "../../app/contexts/authContext";

interface UserModalProps {
  isVisible: boolean;
  username: string | undefined;
  role: string | undefined;
  image?: string;
  description?: string;
  onClose: () => void;
  onLogout: () => void;
}

const ProfileModal = ({
  isVisible,
  username,
  description,
  role,
  image,
  onClose,
  onLogout,
}: UserModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editedProfile, setEditedProfile] = useState<PublicProfile>();
  const slideAnimation = useRef(new Animated.Value(400)).current;

  const slideIn = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnimation, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  React.useEffect(() => {
    if (isVisible) {
      slideIn();
    } else {
      slideOut();
    }
  }, [isVisible]);

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      onBackdropPress={onClose}
      style={[styles.modal, { transform: [{ translateX: slideAnimation }] }]}
    >
      <Animated.View className="flex flex-col items-center px-4 py-1 gap-5  text-center min-h-[90vh] rounded-xl box">
        <TouchableOpacity className="absolute top-0 right-0" onPress={onClose}>
          <Icon name="exit-to-app" size={24} color="#333" />
        </TouchableOpacity>
        <View className="flex flex-col h-full mx-auto w-[70%] pt-10">
          <Text className="w-full text-start font-bold text-lg whitespace-nowrap">
            Profil użytkownika
          </Text>
          <View className="flex flex-wrap w-full pt-14 mx-auto ">
            <TouchableOpacity onPress={() => setIsModalOpen(true)}>
              <Image
                source={
                  image ? { uri: image } : require("../../assets/user.png")
                }
                className="rounded-full max-w-[5.5em] max-h-[5em] w-fit mr-1 overflow-hidden "
              />
              <ChangePictureModal
                setIsModalOpen={setIsModalOpen} // Ustawiamy poprzez funkcję, aby poprawnie zmieniać stan
                isModalOpen={isModalOpen}
              />
            </TouchableOpacity>
            <Text className="mt-5 text-base font-bold"> {username}</Text>
            <Text className="font-bold text-base">Role: {role}</Text>
            <Text className=" text-base font-normal mt-10">{description}</Text>
          </View>
          <View className="w-full flex justify-center mt-48">
            <PrimaryButton title="Wyloguj się" onPress={onLogout} />
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default ProfileModal;

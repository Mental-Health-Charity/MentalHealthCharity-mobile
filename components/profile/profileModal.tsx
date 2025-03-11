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
import { setChatAvatar } from "./lib/setChatAvatar";
import { successToast } from "../../app/utils/toasts";

interface UserModalProps {
  isVisible: boolean;
  id: number | undefined;
  email: string | undefined;
  username: string | undefined;
  role: string | undefined;
  image?: string;
  description?: string;
  onClose: () => void;
  onLogout: () => void;
}

const ProfileModal = ({ ...props }: UserModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
      props.onClose();
    });
  };

  React.useEffect(() => {
    if (props.isVisible) {
      slideIn();
    } else {
      slideOut();
    }
  }, [props.isVisible]);

  return (
    <Modal
      isVisible={props.isVisible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      onBackdropPress={props.onClose}
      style={[styles.modal, { transform: [{ translateX: slideAnimation }] }]}
    >
      <Animated.View className="flex flex-col items-center px-4 py-1 gap-5  text-center min-h-[90vh] rounded-xl box">
        <TouchableOpacity
          className="absolute top-0 right-0"
          onPress={props.onClose}
        >
          <Icon name="exit-to-app" size={24} color="#333" />
        </TouchableOpacity>
        <View className="flex flex-col h-full mx-auto w-[70%] pt-10">
          <Text className="w-full text-lg font-bold text-start whitespace-nowrap">
            Profil użytkownika
          </Text>
          <View className="flex flex-wrap w-full mx-auto pt-14 ">
            <TouchableOpacity onPress={() => setIsModalOpen(true)}>
              <Image
                source={
                  props.image
                    ? { uri: props.image }
                    : require("../../assets/user.png")
                }
                className="rounded-full max-w-[5.5em] max-h-[5em] w-fit mr-1 overflow-hidden "
              />
              {
                <ChangePictureModal
                  setIsModalOpen={setIsModalOpen}
                  isModalOpen={isModalOpen}
                />
              }
            </TouchableOpacity>
            <Text className="mt-5 text-base font-bold">
              {" "}
              Twój unikalny indentyfikator ID: {props.id}
            </Text>
            <Text className="text-base font-bold">
              Adres e-mail: {props.email}
            </Text>
            <Text className="mt-5 text-base font-bold">
              Imię: {props.username}
            </Text>
            <Text className="text-base font-bold">
              Uprawnienia: {props.role}
            </Text>
          </View>
          <View className="flex justify-center w-full mt-48">
            <PrimaryButton
              title="Wyloguj się"
              onPress={() => {
                props.onLogout(), successToast("Wylogowano");
              }}
            />
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

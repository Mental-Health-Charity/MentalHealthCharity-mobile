import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import OpenProfileModalButton from "./openProfileModalButton";
import { useAuth } from "../../app/contexts/authContext";
import ProfileModal from "../profile/profileModal";

type Props = {};

const Header = (props: Props) => {
  const { user, logout } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const navigation = useNavigation();
  return (
    <View className="flex justify-between w-full h-16 bg-[#f3f7fe] ">
      <Image
        source={require("../../assets/logo.png")}
        className="w-32 h-16 ml-5"
        resizeMode="contain"
      />
      <OpenProfileModalButton isModalVisible={openModal} />

      <ProfileModal
        isVisible={isModalVisible}
        onClose={closeModal}
        username={user?.full_name}
        role={user?.user_role}
        description="I am the description"
        onLogout={() => logout()}
      />
    </View>
  );
};

export default Header;

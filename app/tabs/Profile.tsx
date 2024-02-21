import { View, Text } from "react-native";
import React, { useState } from "react";
import ProfileModal from "../../components/profile/profileModal";
import { useAuth } from "../contexts/authContext";

type Props = {};

const Profile = (props: Props) => {
  const { logout, user } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <ProfileModal
        isVisible={isModalVisible}
        username={user?.username}
        role={user?.user_role}
        onClose={closeModal}
        onLogout={() => logout()}
      />
    </View>
  );
};

export default Profile;

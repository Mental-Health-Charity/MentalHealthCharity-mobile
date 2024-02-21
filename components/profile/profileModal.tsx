import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import Modal from "react-native-modal";

import Icon from "react-native-vector-icons/MaterialIcons";

interface UserModalProps {
  isVisible: boolean;
  username: string | undefined;
  role: string | undefined;
  onClose: () => void;
  onLogout: () => void;
}

const ProfileModal = ({
  isVisible,
  username,
  role,
  onClose,
  onLogout,
}: UserModalProps) => {
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
      <Animated.View style={styles.modalContent}>
        <Text style={styles.text}>Username: {username}</Text>
        <Text style={styles.text}>Role: {role}</Text>
        <TouchableOpacity className="mt-4 p-2 bg-blue-500" onPress={onLogout}>
          <Text className="text-white">Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="exit-to-app" size={24} color="#333" />
        </TouchableOpacity>
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

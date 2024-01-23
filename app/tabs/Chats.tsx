import { View, Text } from "react-native";
import React, { useEffect } from "react";
import ChatWindow from "../../components/chat/chatWindow";
import { useAuth } from "../contexts/authContext";
type Props = {};

const Chats = (props: Props) => {
  const { user } = useAuth();

  //   useEffect(() => {
  //     if (!user) {
  //       router.push("(auth)/Login");
  //     }
  //   }, []);
  //   return (
  //     <View>
  //       <ChatWindow />
  //     </View>
  //   );
};

export default Chats;

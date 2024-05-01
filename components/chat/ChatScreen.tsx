import { View, Text, Image } from "react-native";
import { useChat } from "../../app/contexts/chatContext";
import { ChatData, Chat, Message, Messages } from "../../app/utils/chatTypes";
import { useAuth, User } from "../../app/contexts/authContext";

import React, { useEffect, useState } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../Router";

type Props = {
  route: RouteProp<Record<string, object | undefined>, "ChatScreen">;
};

const ChatScreen = ({ route }: Props) => {
  const navigation: NativeStackNavigationProp<MainStackParamList, "Chats"> =
    useNavigation();
  const { user } = useAuth();
  const { getMessages, sendMessage, selectedChat, wsMessages, setWsMessages } =
    useChat();

  // const [messages, setMessages] = useState<Messages | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!selectedChat && user === null) {
    return <p>Nie wybrales lub user nie istnieje</p>;
    // przeniesienie do listy chatów, bo uzytkownik nie wybral czatu
  }

  const readMessages = async (chat: Chat) => {
    if (selectedChat) {
      console.log("Selected chat:", selectedChat);
      setIsLoading(true);
      try {
        const data = getMessages(1, 30, selectedChat?.id);
        const transformedMessages: IMessage[] = (await data).items.map(
          (message: Message) => ({
            _id: message.id.toString(), // Convert id to string if necessary
            text: message.content,
            createdAt: new Date(message.creation_date),
            user: {
              _id: message.sender.id || "",
              avatar: message.sender.avatar_url,
              name: message.sender.full_name,
            },
          })
        );

        setWsMessages(transformedMessages);
      } catch (error) {
        console.error(error);
        navigation.navigate("Chats");
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      readMessages(selectedChat);
    }
  }, [selectedChat]);

  return (
    <View id="ChatScreen">
      <View className="h-full">
        <GiftedChat
          messages={wsMessages}
          user={{
            _id: user?.id || "",
            avatar: user?.avatar_url,
            name: user?.full_name,
          }}
          onSend={(messages) =>
            selectedChat
              ? sendMessage(selectedChat?.id, messages[0].text)
              : console.log("selectedChat nie istnieje")
          }
        />
      </View>
    </View>
  );
};

export default ChatScreen;

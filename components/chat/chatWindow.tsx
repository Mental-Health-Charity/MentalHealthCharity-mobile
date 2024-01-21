import { View, Text, Image } from "react-native";
import { useChat } from "../../app/contexts/chatContext";
import { ChatData, Chat, Message, Messages } from "../../app/utils/chatTypes";
import { useAuth, User } from "../../app/contexts/authContext";

import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";

type Props = {};

const ChatWindow = (props: Props) => {
  const { getChats } = useChat();
  const { user } = useAuth();
  const [chats, setChats] = useState<ChatData | null>(null);

  const readChats = async (page: number) => {
    try {
      const item: ChatData = await getChats(page, 30);
      setChats(item);
      console.log(item);
    } catch (error) {
      console.log("Error retrieving data ", error);
    }
  };

  useEffect(() => {
    readChats(30);
  });

  const handleChatRedirect = (item: any) => {
    router.push(`(chats)/${item.id}`);
    console.log(`Pressed on chat with ID: ${item.id}`);
  };

  const renderChatItem = ({ item }: { item: Chat }) => {
    return (
      <TouchableOpacity onPress={() => handleChatRedirect(item)}>
        <View className="flex-row items-center p-16 border-b-1 border-cyan-300">
          <View className="flex-1">
            <Text className="font-bold text-base">{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text>Chats</Text>
      {chats && <FlatList data={chats.items} renderItem={renderChatItem} />}
    </View>
  );
};

export default ChatWindow;

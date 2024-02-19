import { View, Text, Image } from "react-native";
import { useChat } from "../../app/contexts/chatContext";
import { ChatData, Chat, Message, Messages } from "../../app/utils/chatTypes";
import { useAuth, User } from "../../app/contexts/authContext";

import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { GiftedChat } from "react-native-gifted-chat";
import { RouteProp, useNavigation } from "@react-navigation/native";

type Props = {
  route: RouteProp<Record<string, object | undefined>, "ChatScreen">;
};

const ChatScreen = ({ route }: Props) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { getMessages, sendMessage } = useChat();

  const [messages, setMessages] = useState<Messages | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const readMessages = async (chat: Chat) => {
      setIsLoading(true);
      try {
        const items = await getMessages(1, 100, chat?.id);
        setMessages(items);
        console.log(items);
      } catch (error) {
        console.log("Error retrieving data ", error);
      }
      setIsLoading(false);
    };
    readMessages();
  }, []);

  const messagesArray = messages?.items || [];

  // const handleChatRedirect = (item: any) => {
  //   // router.push(`(chats)/${item.id}`);
  //   console.log(`Pressed on chat with ID: ${item.id}`);
  // };

  // const renderChatItem = ({ item }: { item: Chat }) => {
  //   return (
  //     <TouchableOpacity onPress={() => handleChatRedirect(item)}>
  //       <View className="flex-row items-center p-16 border-b-1 border-cyan-300">
  //         <View className="flex-1">
  //           <Text className="text-base font-bold">{item.name}</Text>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <View>
      <View>
        <GiftedChat
          messages={messages}
          //onSend={(newMessages) => onSend(newMessages)}
          user={{ _id: 1 }}
        />
      </View>
    </View>
  );
};

export default ChatScreen;

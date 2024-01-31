import { View, Text } from "react-native";
import { FlatList } from "react-native";
import { useAuth } from "../contexts/authContext";
import { useChat } from "../contexts/chatContext";
import { useEffect, useState } from "react";
import { Chat, ChatData } from "../utils/chatTypes";
import ChatListObject from "../../components/chat/chatListObject";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChatStackParamList } from "../../components/Router";

type Props = {};

const Chats = (props: Props) => {
  const { user } = useAuth();
  const { getChats } = useChat();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<ChatData | null>(null);

  useEffect(() => {
    const fetchedData = async () => {
      setIsLoading(true);
      try {
        const fetchedChats = await getChats(1, 50);
        setChats(fetchedChats);
      } catch (err) {
        console.error("Błąd podczas pobierania czatów:", err);
      }
      setIsLoading(false);
    };
    fetchedData();
  }, [getChats]);

  const chatsArray = chats?.items || [];

  return (
    <View>
      <Text className="w-full m-1">Czat</Text>
      <View>
        <FlatList
          data={chatsArray}
          keyExtractor={(chat, index) => index.toString()}
          renderItem={({ item: chat, index }) => (
            <ChatListObject
              setSelectedChat={setSelectedChat}
              key={index}
              chat={chat}
              participants={chat.participants}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Chats;

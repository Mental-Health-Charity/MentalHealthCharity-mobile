import { View, Text } from "react-native";
import { FlatList } from "react-native";
import { useAuth } from "../contexts/authContext";
import { useChat } from "../contexts/chatContext";
import { useEffect, useState } from "react";
import { Chat, ChatData } from "../utils/chatTypes";
import ChatListObject from "../../components/chat/chatListObject";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "../../components/Router";
import SendChatRequest from "../../components/chat/SendChatRequest";
//import { ChatStackParamList } from "../../components/Router";

type Props = {};

const Chats = (props: Props) => {
  const navigation: NativeStackNavigationProp<
    MainStackParamList,
    "SendChatRequest"
  > = useNavigation();
  const { user } = useAuth();
  const { getChats, setSelectedChat } = useChat();
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState<ChatData | null>(null);

  useEffect(() => {
    const fetchedData = async () => {
      setIsLoading(true);
      try {
        const fetchedChats = await getChats(0, 50);
        setChats(fetchedChats);
      } catch (err) {
        console.error("Błąd podczas pobierania czatów:", err);
      }
      setIsLoading(false);
    };
    fetchedData();
  }, [getChats]);

  const chatsArray = chats?.items || [];

  if (chatsArray.length === 0) {
    return (
      <View className="m-5 bg-[#f3f7fe] font-normal">
        <Text className="w-full">
          Brak czatów do wyświetlenia, jeśli chcesz uzyskać dostęp wypełnij
          formularz
        </Text>
        <SendChatRequest />
      </View>
    );
  }

  return (
    <View id="czaty" className="bg-[#f3f7fe]">
      <Text className="w-full mx-6 my-4 text-2xl font-bold">Czat</Text>
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

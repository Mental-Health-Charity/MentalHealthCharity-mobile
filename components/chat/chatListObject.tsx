import { View, Text, Image } from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Chat, ChatData } from "../../app/utils/chatTypes";
import { User, useAuth } from "../../app/contexts/authContext";
import { useChat } from "../../app/contexts/chatContext";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../Router";

type ChatListProps = {
  participants: User[] | undefined;
  chat: Chat;
  setSelectedChat: Dispatch<SetStateAction<Chat | undefined>>;
};

const ChatListObject = ({
  participants,
  chat,
  setSelectedChat,
}: ChatListProps) => {
  const navigation: NativeStackNavigationProp<
    MainStackParamList,
    "ChatScreen"
  > = useNavigation();
  return (
    <>
      <TouchableOpacity
        id="chatListItem"
        onPress={() => {
          setSelectedChat(chat); // Ustawia czat w kontekscie
          navigation.navigate("ChatScreen"); // Przekierowuje do strony czatu, ;
        }}
        className="flex flex-row items-start justify-between p-6 m-6 bg-white border-0 rounded-lg"
      >
        <Image
          source={require("../../assets/message.png")}
          className="w-12 h-12 mx-1 my-auto"
        />
        <View className="flex flex-col">
          <Text className="m-0 text-xl text-green-400 ">
            {chat?.name ? chat.name : "Nowa rozmowa"}
          </Text>

          <View className="flex flex-wrap w-48 gap-1 p-0 mt-1 list-none opacity-80 ">
            {participants?.map((user, index) => {
              return (
                <Text className="flex-shrink-0 break-all" key={index}>
                  {user?.full_name ? user.full_name : "Anonim"}
                </Text>
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ChatListObject;

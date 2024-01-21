import { View } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import React, { useEffect, useState } from "react";
import { Messages, Message, Chat } from "../../app/utils/chatTypes";
import { useChat } from "../../app/contexts/chatContext";

type Props = {};

const ChatMessage = (props: Props) => {
  const { getMessages, sendMessage } = useChat();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect((chat: Chat) => {
    const fetchedMessages = getMessages(1, 100, chat?.id);
    setMessages(fetchedMessages);
  }, []);

  const onSend = async (newMessages: IMessage[] = []) => {
    const chatId = newMessages[0].chatId;
    const content = newMessages[0].text;
    await sendMessage(chatId, content);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  return (
    <View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{ _id: 1 }}
      />
    </View>
  );
};

export default ChatMessage;

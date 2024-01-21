import { ChatData, Messages } from "../utils/chatTypes";
import { useState, createContext, Children, useContext } from "react";
import { getCookiesAuth } from "../utils/cookies";
import axios from "axios";

interface ChatContextType {
  getChats: (page: number, size: number) => Promise<ChatData>;
  getMessages: (
    page: number,
    size: number,
    chatId: number
  ) => Promise<Messages>;
  sendMessage: (chatId: number, content: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

const useProvideChat = () => {
  const getChats = async (page: number, size: number) => {
    try {
      const headers = await getCookiesAuth();
      const res = await axios.get(
        `${process.env.PUBLIC_BASE_URL}/api/v1/chat/?page=${page}&size=${size}`,
        { headers: { Authorization: `${headers}` } }
      );

      const data = res.data;
      return data;
    } catch (error) {
      console.log("Błąd w pobieraniu danych", error);
    }
  };

  const getMessages = async (page: number, size: number, chatId: number) => {
    try {
      const headers = await getCookiesAuth();
      const res = await axios.get(
        `${process.env.PUBLIC_BASE_URL}/api/v1/message/${chatId}?page=${page}&size=${size}`,
        { headers: { Authorization: `${headers}` } }
      );

      const data = res.data;
      return data;
    } catch (error) {
      console.log("Błąd w pobieraniu danych", error);
    }
  };

  const sendMessage = async (chatId: number, content: string) => {
    const headers = await getCookiesAuth();
    const body = { content: content };

    try {
      const res = await axios.post(
        `${process.env.PUBLIC_BASE_URL}/api/v1/message/${chatId}`,
        { headers: { Authorization: `${headers}` }, body }
      );
    } catch (error) {
      console.log("Błąd w wysyłaniu wiadomośći", error);
    }
  };

  return { getChats, getMessages, sendMessage };
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useProvideChat();
  return <ChatContext.Provider value={auth}>{children}</ChatContext.Provider>;
};

export const useChat = () => useContext(ChatContext);

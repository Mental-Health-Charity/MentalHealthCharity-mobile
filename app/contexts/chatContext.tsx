import {
  Chat,
  ChatData,
  Contract,
  Message,
  Messages,
} from "../utils/chatTypes";
import {
  useState,
  createContext,
  Children,
  useContext,
  SetStateAction,
  Dispatch,
} from "react";
import { getCookiesAuth } from "../utils/cookies";
import axios from "axios";

interface ChatContextType {
  loading: boolean;
  ready: boolean;
  getChats: (page: number, size: number) => Promise<ChatData>;
  getMessages: (
    page: number,
    size: number,
    chatId: number
  ) => Promise<Messages>;
  sendMessage: (chatId: number, content: string) => Promise<void>;
  createReport: (report: Report) => Promise<void>;
  editContract: (chatId: number, content: string) => Promise<Contract>;
  selectedChat: Chat | undefined;
  setSelectedChat: Dispatch<SetStateAction<Chat | undefined>>;
  chatsList: Chat[];
  ws: WebSocket | undefined;
  unreadedMessages: number;
  wsMessages: Message[];
  setWsMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const specificStatusCodeMappings = {
  1000: "Normal Closure",
  1001: "Going Away",
  1002: "Protocol Error",
  1003: "Unsupported Data",
  1004: "(For future)",
  1005: "No Status Received",
  1006: "Abnormal Closure",
  1007: "Invalid frame payload data",
  1008: "Policy Violation",
  1009: "Message too big",
  1010: "Missing Extension",
  1011: "Internal Error",
  1012: "Service Restart",
  1013: "Try Again Later",
  1014: "Bad Gateway",
  1015: "TLS Handshake",
};

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

const useProvideChat = () => {
  const getChats = async (page: number, size: number) => {
    try {
      const headers = await getCookiesAuth();

      const res = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/v1/chat/?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${headers?.jwtToken}`,
            "Content-Type": headers?.jwtTokenType,
          },
        }
      );
      const data = res.data;
      console.log(data);
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

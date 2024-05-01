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
  useCallback,
  Children,
  useContext,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import { getCookiesAuth, getCookiesHeaders } from "../utils/cookies";
import axios from "axios";
import { User, useAuth } from "./authContext";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

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
  wsMessages: IMessage[];
  wsConnectToChat: () => Promise<void>;
  setWsMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
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
  const { user } = useAuth();

  const [ws, initWS] = useState<WebSocket>();
  const [selectedChat, setSelectedChat] = useState<Chat | undefined>();
  const [wsMessages, setWsMessages] = useState<IMessage[]>([]);

  // 17.03 =========================================

  useEffect(() => {
    if (ws) {
      // kiedy front otrzyma wiadomosc
      ws.onmessage = (e) => {
        const server_message = e.data;
        const newMessage = JSON.parse(server_message);

        console.log("newMessage", newMessage);

        setWsMessages((prevMessages) => {
          const updatedMessages = prevMessages.map((message) => {
            if (message.pending && message.text === newMessage.text) {
              return newMessage;
            } else {
              return message;
            }
          });

          // If the new message is not found in the previous messages, add it to the array
          if (
            !updatedMessages.some((message) => message.id === newMessage.id)
          ) {
            updatedMessages.unshift(newMessage);
          }

          return updatedMessages;
        });
      };
    }
  }, [ws, wsMessages]);

  const wsConnectToChat = useCallback(async () => {
    const data = await getCookiesAuth();

    if (data?.jwtTokenType && selectedChat?.id) {
      if (ws) {
        ws.close();
      }

      const newWebSocket = new WebSocket(
        `wss://mentalhealthcharity-backend-production.up.railway.app/ws-chat?token=${data.jwtToken}&chat_id=${selectedChat.id}`
      );

      newWebSocket.onopen = () => {
        console.warn("connected");
        console.warn("[WS][CONNECTED]");
      };

      newWebSocket.onclose = (evt) => {
        console.error(
          "Połączenie z chatem zostało przerwane, sprawdź swoje połączenie z internetem"
        );
        console.error(
          "Wystąpiła próba z połączeniem",
          `wss://mentalhealthcharity-backend-production.up.railway.app/ws-chat?token=${data.jwtToken}&chat_id=${selectedChat.id}`
        );
        console.warn(
          `[WS][CLOSED] ${
            specificStatusCodeMappings[
              evt.code as keyof typeof specificStatusCodeMappings
            ]
          }`
        );
      };

      initWS(newWebSocket);
    }
  }, [selectedChat]);

  useEffect(() => {
    wsConnectToChat();
  }, [wsConnectToChat]);

  const sendMessage = async (chatId: number, content: string) => {
    if (ws && content.trim() !== "") {
      setWsMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [
          {
            _id: 1,
            text: content,
            createdAt: new Date(),
            user: {
              _id: user?.id || "",
              name: user?.full_name,
              avatar: user?.avatar_url,
            },
          },
        ])
      );
      // setWsMessages((prevMessages) => [
      //   {
      //     text,
      //     creation_date: new Date().toISOString(),
      //     id: 0,
      //     sender: user as User,
      //     isPending: true,
      //   },
      //   ...prevMessages,
      // ]);
      ws.send(JSON.stringify({ chatId, content }));
    }
  };

  // const onSend = useCallback((messages = []) => {

  // }, [])

  // 17.03 ========================================= END

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
      const data = await res.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log("Błąd w pobieraniu danych", error);
    }
  };

  const getMessages = async (page: number, size: number, chatId: number) => {
    console.log("getMessage", page, size, chatId);
    console.log("getMessage", page, size, chatId);
    console.log("getMessage", page, size, chatId);

    try {
      const headers = await getCookiesHeaders();
      console.log(headers);
      // const res = await axios.get(
      //   `${process.env.EXPO_PUBLIC_BASE_URL}/api/v1/message/${chatId}?page=${page}&size=${size}`,
      //   {
      //     headers,
      //   }
      // );

      const res = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/v1/message/${chatId}?page=${page}&size=${size}`,
        {
          method: "get",
          headers,
        }
      );

      // const res = await fetch(
      //   `${process.env.EXPO_PUBLIC_BASE_URL}/api/v1/message/${chatId}?page=${page}&size=${size}`,
      //   {
      //     method: "get",
      //     headers,
      //   }
      // );

      const data = await res.json();
      console.log("DATA OD WIADOMOSCI", data);
      console.log("DATA OD WIADOMOSCI", data);
      console.log("DATA OD WIADOMOSCI", data);
      return data;
    } catch (error) {
      console.log("Błąd w pobieraniu danych", error);
    }
  };

  //   const sendMessage = async (chatId: number, content: string) => {
  //     const headers = await getCookiesAuth();
  //     const body = { content: content };

  //     try {
  //       const res = await axios.post(
  //         `${process.env.PUBLIC_BASE_URL}/api/v1/message/${chatId}`,
  //         { headers: { Authorization: `${headers}` }, body }
  //       );
  //     } catch (error) {
  //       console.log("Błąd w wysyłaniu wiadomośći", error);
  //     }
  //   };

  return {
    getChats,
    getMessages,
    sendMessage,
    wsConnectToChat,
    ws,
    initWS,
    selectedChat,
    setSelectedChat,
    wsMessages,
    setWsMessages,
  };
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useProvideChat();
  return (
    <ChatContext.Provider value={auth as unknown as ChatContextType}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);

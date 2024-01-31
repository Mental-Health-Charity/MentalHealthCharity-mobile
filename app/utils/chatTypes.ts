import { IMessage } from "react-native-gifted-chat";
import { User } from "../contexts/authContext";

export type Contract = {
  is_confirmed: boolean;
  content: string;
  id: number;
};

export interface Report {
  report_type: string;
  subject: string;
  description: string;
}

export interface ChatData {
  items: Chat[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface Chat {
  id: number;
  name: string;
  creation_date: string;
  is_active: boolean;
  participants?: User[];
}

export interface Message extends IMessage {
  content: string;
  id: number;
  sender: User;
  creation_date: string;
}

export interface Messages {
  items: Message[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

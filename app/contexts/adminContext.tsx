import { createContext, useContext, SetStateAction, Dispatch } from "react";
import { EditUser, User } from "./authContext";
import { getCookiesAuth } from "../utils/cookies";
import Roles from "../utils/roles";
import { Article } from "../utils/getArticles";
import axios from "axios";

interface AdminContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  editUser: (id: number, userData: EditUser) => Promise<void>;
  manageArticle: (id: number, articleStatus: ArticleStatus) => Promise<Article>;
  setEditUser: Dispatch<SetStateAction<EditUser | null>>;
}

export enum Status {
  REJECT = "REJECTED",
  CORRECTED = "CORRECTED",
  DRAFT = "DRAFT",
  DELETED = "DELETED",
  PUBLISHED = "PUBLISHED",
  SENT = "SENT",
}

export interface ArticleStatus {
  status: Status;
  reject_message: string;
}

const editUser = async (id: number, userData: EditUser) => {
  const headers = await getCookiesAuth();

  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/${id}/edit-as-admin`,
    userData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${headers?.jwtToken}, ${headers?.jwtTokenType}`,
      },
    }
  );

  const data = res.data;
  return data as User;
};

const manageArticle = async (id: number, articleStatus: ArticleStatus) => {
  const headers = await getCookiesAuth();
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article/${id}/change-status`,
    articleStatus,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${headers?.jwtToken}, ${headers?.jwtTokenType}`,
      },
    }
  );
  const data = res.data;
  return data as Article;
};

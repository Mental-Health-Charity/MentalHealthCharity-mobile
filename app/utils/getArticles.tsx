import axios from "axios";
import { User } from "../contexts/authContext";
import { getCookiesAuth } from "./cookies";
import Roles from "./roles";
import { Status } from "../contexts/adminContext";

export interface Article {
  title: string;
  content: string;
  banner_url: string;
  video_url: string;
  id: number;
  article_category: any;
  minimal_role: string;
  status: string;
  reject_message: string;
  created_by: User;
  creation_date: string;
  required_role?: "ANYONE" | Roles.admin | Roles.volunteer;
}

export interface ArticleItem {
  author: string;
  publishedAt: string;
  title: string;
  content: string;
  src: string;
}

export interface Articles {
  items: Article[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export const getArticle = async (articleId: string) => {
  try {
    const headers = await getCookiesAuth();
    console.log(headers);
    const res = await axios.get(
      `https://mentalhealthcharity-backend-production.up.railway.app/api/v1/article/${articleId}/detail`,
      { headers: { Authorization: `${headers}` } }
    );
    const data: Article = res.data;
    return data;
  } catch (error) {
    console.log("Błąd w pobieraniu danych", error);
  }
};

export const getArticles = async (
  page: number,
  size: number,
  status: string | Status
) => {
  try {
    const headers = await getCookiesAuth();
    console.log(headers);
    const res = await axios.get(
      `https://mentalhealthcharity-backend-production.up.railway.app/api/v1/article/public/?page=${page}&size=${size}&status=${status}`,
      { headers: { Authorization: `${headers}` } }
    );
    const data: Articles = res.data;
    return data;
  } catch (error) {
    console.log("Błąd w pobieraniu danych", error);
  }
};

export const getVolunteerCourses = async (page: number, size: number) => {
  const headers = await getCookiesAuth();

  const res = await axios.get(
    `https://mentalhealthcharity-backend-production.up.railway.app/api/v1/article/public/?page=${page}&size=${size}`,
    {
      headers: {
        Authorization: `Bearer ${headers?.jwtToken}`,
        "Content-Type": headers?.jwtTokenType,
      },
    }
  );

  const data: Articles = await res.data;
  console.log(data);
  return data;
};

export const changeArticleStatus = async (article: Article) => {
  const headers = await getCookiesAuth();

  const res = await axios.put(
    `${process.env.EXPO_PUBLIC_BASE_URL}/api/v1/article/public`,
    {
      headers: {
        Authorization: `Bearer ${headers?.jwtToken}`,
        "Content-Type": headers?.jwtTokenType,
      },
    }
  );
};

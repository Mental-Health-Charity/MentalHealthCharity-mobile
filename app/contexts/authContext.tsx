import { useContext, createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { createCookies, getCookiesAuth } from "../utils/cookies";
import Roles from "../utils/roles";

export interface User {
  full_name: string;
  email: string;
  password: string;
  user_role?: string;
  avatar_url?: string;
  id?: number;
  is_active?: boolean;
}

export interface EditUser {
  full_name: string;
  user_role: Roles;
  is_active: boolean;
  password?: string;
}

interface LoginUserData {
  username: string;
  password: string;
}

export interface PublicProfile {
  avatar_url: string;
  description: string;
}

interface AccessToken {
  access_token: string;
  token_type: string;
  detail?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (loginData: LoginUserData) => Promise<void>;
  logout: () => void;
  signIn: (userData: User) => Promise<void>;
  error: AccessToken | undefined;
}

const TOKEN_KEY = "my-jwt";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const useProvideAuth = (userData: User | null) => {
  const [user, setUser] = useState<User | null>(userData);
  const [error, setError] = useState<AccessToken>();
  const [isLoading, setIsLoading] = useState(true);

  //  Po wejsciu na apke, sprawdzasz czy jest zapisany JWT token w storage, jesli jest
  // to wysylasz request na  ( JESLI NIE MA JWT TO NIE WYKONUJ !!!! )
  // const getUserData = axios.get(`${process.env.PUBLIC_LOGIN_ME_URL}`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: authorization,
  //   },
  // });
  // i po prostu aktualizujesz dane usera, czy nic sie nie zmienilo od ostatniego wejscia na apke

  const signIn = async (newUserParams: User) => {
    const { email, password, full_name } = newUserParams;
    console.log(newUserParams);
    const res = await axios.post(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/v1/users/open`,
      newUserParams.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const data: AccessToken = await res.data;
    await login({ username: email, password });
    if (res.status === 200) {
      setError(undefined);
    } else {
      setError(data);
      console.log("error: ", data);
    }
  };

  const login = async (loginDataParams: LoginUserData) => {
    const { username, password } = loginDataParams;

    try {
      const res = await axios.post<AccessToken>(
        `${process.env.EXPO_PUBLIC_ACCESS_TOKEN_URL}`,
        new URLSearchParams({ username, password }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (res.status === 200) {
        const accessToken = res.data.access_token || "";
        const tokenType = res.data.token_type || "";
        createCookies("jwtToken", accessToken);
        createCookies("jwtTokenType", tokenType);
        const authorization = `${res.data.token_type} ${accessToken}`;

        const getUserData = axios.get<User>(
          `${process.env.EXPO_PUBLIC_LOGIN_ME_URL}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authorization,
            },
          }
        );
        const userDataValue = (await getUserData).data;
        setUser(userDataValue);
        setError(undefined);
      }
    } catch (error: any) {
      console.error("Error response:", error.response.data);
      console.error("Błąd logowania: ", error);
      setUser(null);
      setError(error.response.data);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("accessToken");
      setUser(null);
      console.log("Użytkownik wylogowany");
    } catch (err) {
      console.error("Błąd podczas wylogowywania:", error);
    }
  };

  const getPublicProfile = async (
    id: number,
    publicProfileData: PublicProfile
  ) => {
    const headers = await getCookiesAuth();
    console.log(headers);

    const res = axios.get(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/v1/user-public-profile/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${headers?.jwtToken}, ${headers?.jwtTokenType}`,
        },
      }
    );

    const data = (await res).data;
    return data as User;
  };

  const editPublicProfile = async (
    id: number,
    publicProfileData: PublicProfile
  ) => {
    const headers = await getCookiesAuth();
    console.log(headers);

    const res = axios.put(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/v1/user-public-profile/${id}`,
      publicProfileData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${headers?.jwtToken}, ${headers?.jwtTokenType}`,
        },
      }
    );

    const data = (await res).data;
    return data as User;
  };

  return {
    user,
    setUser,
    login,
    logout,
    signIn,
    getPublicProfile,
    editPublicProfile,
    error,
  };
};

export const AuthProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) => {
  const auth = useProvideAuth(user);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

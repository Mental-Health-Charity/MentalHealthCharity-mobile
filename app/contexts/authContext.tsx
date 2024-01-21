import { useContext, createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { createCookies } from "../utils/cookies";
import { useRouter, useSegments } from "expo-router";

export interface User {
  full_name: string;
  username: string;
  email: string;
  password: string;
  user_role?: string;
  id?: number;
  is_active?: boolean;
}

interface LoginUserData {
  username: string;
  password: string;
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

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const useProvideAuth = (userData: User | null) => {
  const [user, setUser] = useState<User | null>(userData);
  const [error, setError] = useState<AccessToken>();

  const signIn = async (newUserParams: User) => {
    const { username, password, full_name } = newUserParams;
    const res = await axios.post(
      `${process.env.PUBLIC_BASE_URL}/api/v1/users/open`,
      { username, password, full_name }
    );
    const data: AccessToken = await res.data;
    await login({ username, password });
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
      const res = await axios.post(`${process.env.PUBLIC_ACCESS_TOKEN_URL}`, {
        username,
        password,
      });

      if (res.status === 200) {
        const accessToken = res.data?.access_token || "";
        createCookies(username, accessToken);
        const authorization = `${res.data.token_type} ${accessToken}`;

        const getUserData = axios.get(`${process.env.PUBLIC_LOGIN_ME_URL}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: authorization,
          },
        });
        const userDataValue: User = (await getUserData).data;
        setUser(userDataValue);
        setError(undefined);
      }
    } catch (error: any) {
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

  return {
    user,
    setUser,
    login,
    logout,
    signIn,
    error,
  };
};

const useProtectedRoutes = (user: User | null) => {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "auth";
    if (!user && inAuthGroup) {
      router.replace("/Login");
    } else {
      router.replace("(tabs)");
    }
  }, [user, segments]);
};

export const AuthProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) => {
  const auth = useProvideAuth(user);
  useProtectedRoutes(user);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

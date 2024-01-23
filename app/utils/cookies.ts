import * as SecureStore from "expo-secure-store";
import { User } from "../contexts/authContext";

export const createCookies = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log("SecureStore.setItemAsync =>", `${key} ${value}`);
  } catch (error) {
    console.error("Błąd podczas zapisywania w SecureStore:", error);
  }
};
export const getCookiesAuth = async () => {
  try {
    const jwtToken = await SecureStore.getItemAsync("jwtToken");
    const jwtTokenType = await SecureStore.getItemAsync("jwtTokenType");

    if (!jwtTokenType || !jwtToken) {
      console.log(
        "Brak danych uwierzytelniających w bezpiecznym przechowywaniu."
      );
      return null;
    }

    const authData = {
      jwtToken,
      jwtTokenType,
    };
    return authData;
  } catch (err) {
    console.log("Błąd podczas pobierania danych uwierzytelniających:", err);
  }
};

export const restoreUserSession = async () => {
  try {
    const jwtToken = await SecureStore.getItemAsync("jwtToken");
    const jwtTokenType = await SecureStore.getItemAsync("jwtTokenType");

    if (jwtToken && jwtTokenType) {
      const res = await fetch(`${process.env.EXPO_PUBLIC_LOGIN_ME_URL}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${jwtTokenType} ${jwtToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Nie udało się pobrać tokenu: ${res.status}`);
      }

      const data = await res.json();

      console.log("Odpowiedź serwera", data);

      return data as User; // Zwracamy bezpośrednio obiekt, a nie obiekt w Promise
    }

    console.log("nie ma tokenu");
    return null; // Zwracamy null, jeśli brakuje tokenu
  } catch (error) {
    console.log("jest error", error);
    return null; // Zwracamy null w przypadku błędu
  }
};

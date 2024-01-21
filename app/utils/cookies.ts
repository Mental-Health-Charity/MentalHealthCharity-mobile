import * as SecureStore from "expo-secure-store";

export const createCookies = async (name: string, value: string) => {
  try {
    // Zapisz wartość w SecureStore
    await SecureStore.setItemAsync(name, value);
    console.log("SecureStore.setItemAsync =>", `${name}: ${value}`);
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
      const res = await fetch(`${process.env.PUBLIC_LOGIN_ME_URL}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${jwtTokenType} ${jwtToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Nie udało się pobrać tokenu: ${res.status}`);
      }

      return res.json();
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

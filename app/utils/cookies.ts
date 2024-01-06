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

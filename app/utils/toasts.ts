import { Toast } from "toastify-react-native";

export const successToast = (message: string, position: string) => {
  Toast.success(message, position);
};

export const errorToast = (message: string, position: string) => {
  Toast.error(message, position);
};

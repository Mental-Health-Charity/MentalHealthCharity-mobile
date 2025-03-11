import Toast from "react-native-root-toast";

export const successToast = (message: string) => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    containerStyle: {
      backgroundColor: "green",
    },
  });
};

export const errorToast = (message: string) => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    containerStyle: {
      backgroundColor: "red",
    },
  });
};

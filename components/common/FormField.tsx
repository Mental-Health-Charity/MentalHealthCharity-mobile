import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const FormField = (props: any) => {
  const {
    field: { onBlur, onChange, name, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];
  return (
    <>
      <Animated.View
        entering={FadeInDown.duration(1000).springify()}
        className="w-full p-5 bg-gray-300 rounded-2xl"
      >
        <TextInput
          value={value}
          onChangeText={(text) => onChange(name)(text)}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          {...inputProps}
        />
        {hasError && <Text className="text-xs color-red">{errors[name]}</Text>}
      </Animated.View>
    </>
  );
};

export default FormField;

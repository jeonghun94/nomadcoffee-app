import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function () {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  const passwordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  return (
    <AuthLayout>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            autoFocus
            placeholder="username"
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
            returnKeyType="next"
            onBlur={onBlur}
            onChangeText={onChange}
            onSubmitEditing={() => onNext(passwordRef)}
            value={value}
          />
        )}
        name="username"
      />
      {errors.username && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={passwordRef}
            placeholder="password"
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
            returnKeyType="done"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {errors.password && <Text>This is required.</Text>}

      <AuthButton
        text="Log In"
        disabled={false}
        onPress={handleSubmit(onSubmit)}
      />
    </AuthLayout>
  );
}

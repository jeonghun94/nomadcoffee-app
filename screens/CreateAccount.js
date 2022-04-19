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
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onDone = () => {
    alert("done!");
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
            placeholder="First Name"
            placeholderTextColor="gray"
            returnKeyType="next"
            onSubmitEditing={() => onNext(lastNameRef)}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={lastNameRef}
            placeholder="Last Name"
            placeholderTextColor="gray"
            returnKeyType="next"
            onSubmitEditing={() => onNext(usernameRef)}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />
      {errors.lastName && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={usernameRef}
            placeholder="Username"
            placeholderTextColor="gray"
            returnKeyType="next"
            onSubmitEditing={() => onNext(emailRef)}
            onBlur={onBlur}
            onChangeText={onChange}
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
            ref={emailRef}
            placeholder="Email"
            placeholderTextColor="gray"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => onNext(passwordRef)}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={passwordRef}
            placeholder="Password"
            placeholderTextColor="gray"
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleSubmit(onSubmit)}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            // onSubmitEditing={onDone}
          />
        )}
        name="password"
      />
      {errors.password && <Text>This is required.</Text>}

      <AuthButton
        text="Create Account"
        disabled={false}
        onPress={handleSubmit(onSubmit)}
      />
    </AuthLayout>
  );
}

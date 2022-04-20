import { gql, useMutation } from "@apollo/client";
import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { logUserIn } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function Login({ route: { params } }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: params ? params?.username : "",
      password: params ? params?.password : "",
    },
  });

  const onCompleted = async (data) => {
    const {
      login: { ok, token },
    } = data;
    console.log(data, "onComlpited");
    if (ok) {
      await logUserIn(token);
    }
  };
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = (data) => {
    console.log(data);
    console.log(loading);
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };

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
            secureTextEntry
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
        loading={loading}
        onPress={handleSubmit(onSubmit)}
      />
    </AuthLayout>
  );
}

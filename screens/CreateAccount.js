import { gql, useMutation } from "@apollo/client";
import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $name: String!
    $location: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      name: $name
      location: $location
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

export default function ({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      location: "",
      email: "",
      password: "",
    },
  });

  const onCompleted = (data) => {
    const {
      createAccount: { ok },
    } = data;
    const { username, password } = getValues();
    if (ok) {
      navigation.navigate("Login", {
        username,
        password,
      });
    }
  };
  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmit = (data) => {
    console.log(data);
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
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
            placeholder="Name"
            placeholderTextColor="gray"
            returnKeyType="next"
            onSubmitEditing={() => onNext(lastNameRef)}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="name"
      />
      {errors.name && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={lastNameRef}
            placeholder="UserName"
            placeholderTextColor="gray"
            returnKeyType="next"
            onSubmitEditing={() => onNext(usernameRef)}
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
            ref={usernameRef}
            placeholder="Location"
            placeholderTextColor="gray"
            returnKeyType="next"
            onSubmitEditing={() => onNext(emailRef)}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="location"
      />
      {errors.location && <Text>This is required.</Text>}

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
        loading={loading}
        onPress={handleSubmit(onSubmit)}
      />
    </AuthLayout>
  );
}

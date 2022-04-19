import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

const LoginText = styled.Text`
  color: ${colors.blue};
  font-size: 14px;
`;

// navigation 인자를 전달 받아야함
export default function ({ navigation }) {
  const goCreateAccount = () => navigation.navigate("CreateAccount");
  const goLogin = () => navigation.navigate("Login");
  return (
    <AuthLayout>
      <AuthButton
        text="Crate New Account"
        disabled={false}
        onPress={goCreateAccount}
      />
      <TouchableOpacity onPress={goLogin}>
        <LoginText>Login</LoginText>
      </TouchableOpacity>
    </AuthLayout>
  );
}

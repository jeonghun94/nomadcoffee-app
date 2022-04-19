import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function ({ navigation }) {
  return (
    <View>
      <Text>CreateAccount</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

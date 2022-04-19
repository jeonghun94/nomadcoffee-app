import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

// navigation 인자를 전달 받아야함
export default function ({ navigation }) {
  return (
    <View>
      <Text>Welcome</Text>
      {/* touchableOpacity 에서 navigation.navigate 를 호출하면 스택이 쌓임 */}
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <Text>Go to CreateAccounts</Text>
      </TouchableOpacity>
    </View>
  );
}

import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import ScreenLayout from "../components/ScreenLayout";

export default function Feed({ navigation }) {
  const data = {
    seeFeed: [
      { id: 1, caption: "라라라" },
      { id: 2, caption: "라라라" },
      { id: 3, caption: "라라라" },
      { id: 3, caption: "라라라" },
      { id: 3, caption: "라라라" },
      { id: 3, caption: "라라라" },
      { id: 3, caption: "라라라" },
      { id: 3, caption: "라라라" },
      { id: 3, caption: "라라라" },
      { id: 3, caption: "라라라" },
      { id: 3, caption: "라라라" },
      { id: 3, caption: "라라라" },
      { id: 3, caption: "라라라" },
      { id: 3, caption: "라라라" },
    ],
  };
  const renderPhoto = ({ item: photo }) => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ color: "white" }}>{photo.caption}</Text>
      </View>
    );
  };
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
        <Text style={{ color: "white" }}>Photo</Text>
      </TouchableOpacity> */}
      <ScreenLayout loading={false}>
        <FlatList
          data={data?.seeFeed}
          keyExtractor={(photo) => +photo.id}
          renderItem={renderPhoto}
        />
      </ScreenLayout>
    </View>
  );
}

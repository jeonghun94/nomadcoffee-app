import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { View, Text, FlatList, Image, useWindowDimensions } from "react-native";
import ScreenLayout from "../components/ScreenLayout";

const SEE_COFFEESHOPS = gql`
  query seeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      id
      name
      latitude
      longitude
      user {
        id
        name
        username
      }
      photos
      categories {
        name
      }
    }
  }
`;

export default function Feed() {
  const { data, loading, refetch, fetchMore } = useQuery(SEE_COFFEESHOPS, {
    variables: {
      page: 0,
    },
  });

  const { width } = useWindowDimensions();
  const renderPhoto = ({ item: shop }) => {
    console.log(shop, "shop");
    return (
      <View style={{ flex: 1, marginVertical: 15 }}>
        <Text style={{ color: "white", fontSize: 25 }}>
          {shop.name}
          {shop.categories.map((category) => (
            <Text key={category.name} style={{ color: "white", fontSize: 20 }}>
              &nbsp;({category.name})
            </Text>
          ))}
        </Text>

        <Image
          style={{
            width,
            height: 230,
            marginVertical: 5,
          }}
          resizeMode="cover"
          source={{ uri: shop.photos }}
        />
        <Text style={{ color: "white", marginVertical: 8 }}>
          등록자: {shop.user.name}({shop.user.username})
        </Text>
      </View>
    );
  };

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          onEndReachedThreshold={0}
          onEndReached={() =>
            fetchMore({
              variables: {
                page: data?.seeCoffeeShops?.length,
              },
            })
          }
          refreshing={refreshing}
          onRefresh={refresh}
          showsVerticalScrollIndicator={false}
          data={data?.seeCoffeeShops}
          keyExtractor={(photo) => +photo.id}
          renderItem={renderPhoto}
        />
      </ScreenLayout>
    </View>
  );
}

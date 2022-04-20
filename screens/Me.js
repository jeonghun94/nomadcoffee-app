import { useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";
import { Text, View, Image } from "react-native";
import { isLoggedInVar, tokenVar } from "../apollo";
import Login from "./Login";
import { gql, useQuery } from "@apollo/client";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($token: String!) {
    seeProfile(token: $token) {
      id
      name
      username
      avatarURL
      totalFollowing
      totalFollowers
    }
  }
`;

export default function Me() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const token = useReactiveVar(tokenVar);

  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      token,
    },
  });

  console.log(data, "data");

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return isLoggedIn ? (
    <View
      style={{
        flex: 1,
        marginTop: -30,
        paddingHorizontal: 25,
        paddingVertical: 10,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: "black",
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "red",
          marginBottom: 5,
        }}
      >
        <Text style={{ color: "white", fontSize: 26, fontWeight: "700" }}>
          {data?.seeProfile?.username}
        </Text>
        {/* <Text style={{ color: "white", fontSize: 24 }}>ICON</Text> */}
      </View>

      <View
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "blue",
          paddingVertical: 20,
          marginLeft: -18,
        }}
      >
        <Image
          style={{
            width: 70,
            height: 70,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: "white",
          }}
          source={
            "https://d1telmomo28umc.cloudfront.net/media/public/avatars/jeongh1021-1617348583.jpg"
          }
        />
        <Text style={{ color: "white" }}>0</Text>
        <Text style={{ color: "white" }}>
          {data?.seeProfile?.totalFollowers}
        </Text>
        <Text style={{ color: "white" }}>
          {data?.seeProfile?.totalFollowers}
        </Text>
      </View>
      <View
        style={{
          marginTop: -10,
        }}
      >
        <Text style={{ color: "white" }}>{data?.seeProfile?.name}</Text>
      </View>
      {/* <Text style={{ color: "white" }}>{data?.seeProfile?.avatarURL}</Text> */}

      <View
        style={{
          flex: 4.5,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111",
        }}
      >
        {/* <Text>dd</Text> */}
      </View>
    </View>
  ) : (
    <Login />
  );
}

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
        paddingHorizontal: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <View
        style={{
          flex: 0.5,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          // backgroundColor: "red",
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
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: -20,
          // backgroundColor: "blue",
          paddingRight: 30,
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
        <View>
          <Text style={{ color: "white", textAlign: "center" }}>0</Text>
          <Text style={{ color: "white", textAlign: "center" }}>게시물</Text>
        </View>
        <View>
          <Text style={{ color: "white", textAlign: "center" }}>
            {data?.seeProfile?.totalFollowers}
          </Text>
          <Text style={{ color: "white", textAlign: "center" }}>팔로워</Text>
        </View>
        <View>
          <Text style={{ color: "white", textAlign: "center" }}>
            {data?.seeProfile?.totalFollowers}
          </Text>
          <Text style={{ color: "white", textAlign: "center" }}>팔로잉</Text>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "left",
          // backgroundColor: "green",
          marginTop: -13,
          marginLeft: 5,
        }}
      >
        <Text style={{ color: "white", fontSize: 14 }}>
          {data?.seeProfile?.name}
        </Text>
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

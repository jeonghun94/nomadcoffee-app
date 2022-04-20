import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async (token) => {
  await AsyncStorage.multiSet([
    ["token", token],
    ["loggedIn", "Yes"],
  ]);
  isLoggedInVar(true);
  tokenVar(token);
};

export const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://instaclone-backend-jh.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

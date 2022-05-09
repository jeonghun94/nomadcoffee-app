import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";
import { gql, useLazyQuery } from "@apollo/client";
import DismissKeyboard from "../components/DismissKeyboard";

const SEARCH_COFFEESHOPS_QUERY = gql`
  query ($keyword: String!) {
    searchCoffeeShops(keyword: $keyword) {
      id
      name
      photos
    }
  }
`;

const TextContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TextContainerText = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

export default function Search({ navigation }) {
  const numColumns = 3;
  const { width } = useWindowDimensions();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      keyword: "",
    },
  });

  const [searchCoffeeShops, { loading, data, called }] = useLazyQuery(
    SEARCH_COFFEESHOPS_QUERY
  );

  const onSubmit = ({ keyword }) => {
    searchCoffeeShops({
      variables: {
        keyword,
      },
    });
  };

  const renderImage = ({ item: coffeeShop }) => (
    <TouchableOpacity>
      <Image
        source={{ uri: coffeeShop.photos }}
        style={{
          width: width / numColumns,
          height: 120,
          borderWidth: 0.8,
          borderColor: "black",
        }}
      />
    </TouchableOpacity>
  );
  const SearchBox = () => {
    return (
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{
              borderRadius: 10,
              borderWidth: 1,
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: "#222",
              color: "white",
              width: width - 40,
            }}
            autoFocus={true}
            returnKeyLabel="search"
            returnKeyType="search"
            placeholder="커피샵 이름이나, 카테고리로 검색하세요."
            placeholderTextColor="#c8c8c8"
            onBlur={onBlur}
            onChangeText={onChange}
            onSubmitEditing={handleSubmit(onSubmit)}
            value={value}
          />
        )}
        name="keyword"
      />
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
      headerTitleStyle: {
        borderBottomWidth: 0,
      },
    });
  }, []);

  return (
    <DismissKeyboard>
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
        }}
      >
        {!called ? (
          <TextContainer>
            <TextContainerText>
              Search By CoffeeShop Name OR Keyword :)
            </TextContainerText>
          </TextContainer>
        ) : null}

        {loading ? (
          <TextContainer>
            <TextContainerText style={{ color: "white" }}>
              Loading...
            </TextContainerText>
          </TextContainer>
        ) : null}

        {data?.searchCoffeeShops !== undefined ? (
          data?.searchCoffeeShops?.length === 0 ? (
            <TextContainer>
              <TextContainerText style={{ color: "white" }}>
                Can't Not Found Anyting :(
              </TextContainerText>
            </TextContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data?.searchCoffeeShops}
              keyExtractor={(coffeeShop) => coffeeShop.id}
              renderItem={renderImage}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}

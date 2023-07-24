import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import styles from "../styles/style";
import NewsCard from "../components/NewsCard";

// GRAPHQL - CLIENT
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_POSTS, GET_POST_DETAIL } from "../queries/query";

const HomeScreen = () => {
  const { navigate } = useNavigation();

  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) {
    return (
      <View styles={styles.loading}>
        <Text style={{ color: "red", fontSize: 24, fontWeight: "bold" }}>
          Loading ...
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://pustaka.unand.ac.id/media/k2/items/cache/5288462d048e0d3f60f64bb84cff6df4_XL.jpg",
        }}
        style={styles.logo}
      />

      <FlatList
        data={data?.posts}
        renderItem={({ item }) => <NewsCard data={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default HomeScreen;

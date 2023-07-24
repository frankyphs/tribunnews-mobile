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
import { GET_POSTS, GET_POST_DETAIL } from "../queries/query";
import { useQuery, useLazyQuery } from "@apollo/client";
import styles from "../styles/style";

const NewsCard = ({ data }) => {
  const { navigate } = useNavigation();
  const [dispatch] = useLazyQuery(GET_POST_DETAIL, {
    onCompleted: (postDetail) => {
      navigate("DetailBerita", { postDetail: postDetail.postDetail });
    },
  });

  const handleBeritaPress = (id) => {
    dispatch({ variables: { postId: Number(id) } });
  };

  return (
    <View style={styles.newsContainer}>
      <Image
        source={{
          uri: data?.imgUrl,
        }}
        style={styles.newsImage}
      />
      <Text style={styles.newsTitle}>{data?.title}</Text>
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={styles.newsDescription}
      >
        ({data?.content})
      </Text>
      <Text style={styles.newsLink} onPress={() => handleBeritaPress(data.id)}>
        Baca Selengkapnya...
      </Text>
    </View>
  );
};

export default NewsCard;

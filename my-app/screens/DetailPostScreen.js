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

const DetailBeritaScreen = ({ navigation, route }) => {
  const { postDetail } = route.params;

  console.log(postDetail, "<<<berita id");
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>{postDetail.title}</Text>
      <Text style={styles.cardHomeCategory}>
        Author by: {postDetail?.authorName}
      </Text>
      <Text style={styles.cardHomeCategory}>
        Tags: {postDetail?.Tags[0]?.name}-{postDetail?.Tags[1]?.name}-
        {postDetail?.Tags[2]?.name}
      </Text>
      <Text style={styles.cardHomeCategory}>
        Category: {postDetail.Category?.name}
      </Text>
      <Image
        source={{
          uri: postDetail.imgUrl,
        }}
        style={styles.newsImageDetail}
      />
      <Text style={styles.newsContent}>{postDetail.content}</Text>
    </View>
  );
};

export default DetailBeritaScreen;

import React from "react";
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
import { TouchableOpacity } from "react-native";
import { ApolloProvider } from "@apollo/client";
import styles from "../styles/style";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_POSTS, GET_POST_DETAIL } from "../queries/query";

export default CategoriesScreen = () => {
  const { data, loading, error } = useQuery(GET_POSTS);
  const { navigate } = useNavigation();
  const [dispatch] = useLazyQuery(GET_POST_DETAIL, {
    onCompleted: (postDetail) => {
      navigate("DetailBerita", { postDetail: postDetail.postDetail });
    },
  });
  const handleBeritaPress = (id) => {
    dispatch({ variables: { postId: Number(id) } });
  };

  const categories = [
    "Hukum",
    "Ekonomi",
    "Sosial",
    "Olahraga",
    "Politik",
    "Agama",
    "Seni-Budaya",
  ];
  const [activeCategory, setActiveCategory] = React.useState(categories[0]);
  const [filteredData, setFilteredData] = React.useState([]);

  React.useEffect(() => {
    // Filter data berita berdasarkan kategori yang aktif
    const filteredNews = data?.posts.filter(
      (item) => item.Category.name === activeCategory
    );
    setFilteredData(filteredNews);
  }, [activeCategory]);

  const handleCategoryPress = (category) => {
    setActiveCategory(category);
  };

  return (
    <View>
      <CategoryBar
        categories={categories}
        activeCategory={activeCategory}
        onPressCategory={handleCategoryPress}
      />
      <ScrollView>
        {filteredData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.cardContainer}
            onPress={() => handleBeritaPress(item.id)}
          >
            <Image source={{ uri: item.imgUrl }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardAuthor}>
                News Tag : {item?.Tags[0]?.name}-{item?.Tags[1]?.name}-
                {item?.Tags[2]?.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

CategoryBar = ({ categories, activeCategory, onPressCategory }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.containerCategory}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.category,
              category === activeCategory && styles.activeCategory,
            ]}
            onPress={() => onPressCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                category === activeCategory && styles.activeCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

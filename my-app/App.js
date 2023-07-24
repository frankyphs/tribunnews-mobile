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
import client from "./config/config";
import styles from "./styles/style";
import HomeScreen from "./screens/HomeScreen";
import DetailBeritaScreen from "./screens/DetailPostScreen";
import HomeStack from "./screens/HomeStack";
import CategoryScreen from "./screens/CategoryScreen";
import NewsCard from "./components/NewsCard";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
            return <AntDesign name={iconName} size={size} color={color} />;
          } else if (route.name === "Categories") {
            iconName = focused ? "appstore1" : "appstore1";
            return <AntDesign name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "#FF0000",
        tabBarInactiveTintColor: "#888",
      })}
    >
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={HomeStack}
      />
      <Tab.Screen
        name="Categories"
        options={{
          tabBarLabel: "Categories",
        }}
        component={CategoryScreen}
      />
    </Tab.Navigator>
  );
};

// ----------------------------------------Pakai App yang ini------------------------------------
export default function App() {
  // const [activeTab, setActiveTab] = useState("home");

  // const handleTabPress = (tab) => {
  //   setActiveTab(tab);
  // };
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
}

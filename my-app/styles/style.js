import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  loading: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomNavBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingBottom: 12,
  },
  tab: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
  logo: {
    width: 200,
    height: 60,
    alignSelf: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  newsContainer: {
    marginBottom: 20,
  },
  newsImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    // marginBottom: 10,
  },
  newsImageDetail: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 16,
    marginTop: 7,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4,
  },
  newsDescription: {
    fontSize: 14,
    color: "#555",
  },
  newsLink: {
    color: "#FF0000",
    textDecorationLine: "underline",
    marginTop: 4,
  },
  newsContent: {
    fontSize: 16,
    lineHeight: 24,
  },
  containerCategory: {
    flexDirection: "row",
    alignItems: "center",
  },
  category: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#EDEDED",
  },
  activeCategory: {
    backgroundColor: "#FF0000",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#888",
  },
  activeCategoryText: {
    color: "#FFF",
  },
  cardContainer: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    overflow: "hidden",
  },
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginTop: 10.0,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  cardCategory: {
    fontSize: 14,
    color: "#888888",
    marginBottom: 4,
  },
  cardHomeCategory: {
    fontSize: 14,
    color: "#888888",
  },
  cardAuthor: {
    fontSize: 12,
    color: "#888888",
  },
});

module.exports = styles;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require("./schemas/user");

const {
  typeDefs: postTypeDefs,
  resolvers: postResolvers,
} = require("./schemas/post");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs],
  resolvers: [userResolvers, postResolvers],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
})
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((err) => {
    console.log(err);
  });

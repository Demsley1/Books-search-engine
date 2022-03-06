const express = require('express');
const path = require('path');
const db = require('./config/connection');
// import/require apollo server methods, and class constructor for work with graphql.
const { ApolloServer } = require('apollo-server-express') ;
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core/dist/plugin/drainHttpServer');
const http = require('http');
const { authMiddleware } = require('./utils/auth');

// import typedefs, and resolvers methods
const { typeDefs, resolvers } = require('./schemas');
const app = express();
const PORT = process.env.PORT || 3001;

// function to start the apollo server
async function startApolloServer(typeDefs, resolvers) {
  // creates a new instance of the apollo server with express router
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: authMiddleware
  });
  
  // start the server before applying the middleware methods
  await server.start();
  server.applyMiddleware({ app });

  await new Promise(resolve => httpServer.listen({port: 4000}, resolve));
  console.log(`Use graphql at http://localhost:4000${server.graphqlPath}`);
}

// call the funciton to start the server and pass in the typedefs and resolvers as parameters
startApolloServer(typeDefs, resolvers);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

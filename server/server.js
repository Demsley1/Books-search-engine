const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express') ;
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core/dist/plugin/drainHttpServer');
const http = require('http');

const { typeDefs, resolvers } = require('./schemas');
const app = express();
const PORT = process.env.PORT || 3001;

async function startApolloServer(typeDefs, resolvers) {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });
  
  await server.start();
  server.applyMiddleware({ app });

  await new Promise(resolve => httpServer.listen({port: 3000}, resolve));
  console.log(`Use graphql at http://localhost:3000${server.graphqlPath}`);
}

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

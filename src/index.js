/* eslint-disable prefer-destructuring */
require('dotenv').config();
import session from 'express-session'
import ms from 'ms'
import { GraphQLServer, PubSub } from 'graphql-yoga';
import { Prisma } from 'prisma-binding'
import { resolvers, fragmentReplacements } from './resolvers';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 4000;

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    pubsub,
    prisma: new Prisma({
      typeDefs: 'src/generated/graphql/prisma.graphql',
      endpoint: process.env.PRISMA_ENDPOINT,
      secret: process.env.PRISMA_MANAGEMENT_API_SECRET,
      fragmentReplacements
    }),
  }),
  fragmentReplacements
});

server.express.use(session({
  name: 'pid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProduction,
    maxAge: ms('1d'),
  },
}));

server.start({ 
  port,
  // cors: {
  //   credentials: true,
  //   origin: 'http://localhost:1234',
  // },
}, () =>
  console.log(`🚀 Server ready at http://localhost:${port}`)
)

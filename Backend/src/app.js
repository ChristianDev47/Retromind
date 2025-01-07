import express from 'express'
import CONFIG from './config/environment.js'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import http from 'http'
import jwt from 'jsonwebtoken'
import { errorHandler } from './errors/errorHandler.js'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import User from './models/schemas/User.js'

async function startApolloServer (typeDefs, resolvers) {
  const app = express()

  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    formatError: (error) => errorHandler(error),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await server.start();

  app.use(
    '/graphql',
    cors(), 
    express.json(), 
    expressMiddleware(server, {
      context: async ({ req }) => { 
        const auth = req ? req.header('authorization') : null
        if(auth && auth.toLowerCase().startsWith('bearer ')) {
          const token = auth.substring(7)
          const {id} = jwt.verify(token, CONFIG.LOGIN.JWT_SECRET)
          const currentUser = await User.findById(id)
          return { currentUser }
        }
      },
    })
  )
  
  await new Promise(resolve => httpServer.listen ({
    port: CONFIG.API.PORT
  }, resolve))

  console.log(`Server is running at http://localhost:${CONFIG.API.PORT}/graphql`);
}

export default startApolloServer
import startApolloServer from "./app.js";
import connectDB from "./config/db.js";
import { resolvers } from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/typeDefs/index.js";

// Configuracion de algunas cosas del server
// https://www.youtube.com/watch?v=Z-cujIvf7dg


// Templates views
// https://reiro.fueko.net/every-day-in-every-city-and-town-across-thue-country/
// https://preview.themeforest.net/item/maktub-minimal-lightweight-blog-for-wordpress/full_screen_preview/38348402?_ga=2.144786355.640238233.1732316688-1199551131.1718147491
// https://themeger.shop/wordpress/katen/

connectDB()
startApolloServer(typeDefs, resolvers)
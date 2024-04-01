const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path'); 

// Define el esquema de GraphQL
const typeDefs = gql`
  type Query {
    hello(message: String!): String
    aboutFrankAguirre: String
    aboutJuleipssy: String
    aboutSebastian: String
    aboutManuelCardoso: String
  }
`;

// Define los resolvers de GraphQL
const resolvers = {
  Query: {
    hello: (_, { message }) => {
        return `¡Hola, ${message}! Un saludo por parte del profe `;
      },
      aboutFrankAguirre: () => {
        return 'Hola, soy franklin aguirre, estudio ingenieria en sistemas,tengo 23, me gustan las motos, trabajo en la seccion de cultura recreacion y deporte de la universidad, mi trabajo consiste en hacer un aplicativo web, trabajo los fines de semana como auxiliar operativo los fines de semana en comfandi pance, soy trabajador en alturas y rescatista profesional en alturas';

      },
      aboutJuleipssy: () => {
        return 'Hola, soy Juleipssy, estudio ingenieria en sistemas, me gusta mucho el fútbol, trabajo en ASES, me encanta la musica ';

      },
      aboutSebastian: () => {
        return 'Hola, soy Sebastián Orrego, antes estudiaba ingeniería de materiales pero nunca me gustó. Me gustan mucho los videojuegos y hacer cualquier deporte, por otro lado, me gustaría llegar a ser igual de pro que el profesor para el desarrollo. ';

      },
      aboutManuelCardoso: () => {
        return 'Hola soy Manuel Felipe estudiante de ingenieria de sistemas, tengo 20 años, me gusta mucho el deporte en especial el baloncensto el cual practique competitivamente por 3 años en el equipo del colegio, soy una persona muy activa y aunque actualmente no juegue baloncesto me gusta montar bicicleta e ir a entrenear en el ginmaio, mi genero de musica fav es el indie y actualmente no tengo trabajo pero estoy en busqueda de chamba';
      },
  },
};

async function startApolloServer() {
  // Crea la instancia de Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers });

  // Inicia el servidor Apollo
  await server.start();

  // Crea la aplicación Express
  const app = express();

  // Aplica el middleware de Apollo Server a la aplicación Express
  server.applyMiddleware({ app, path: '/graphql' });

  // Sirve la aplicación de React desde la carpeta "saludofront-app"
   const reactAppPath = path.join(__dirname, 'saludofront-app', 'dist');
    app.use(express.static(reactAppPath));
    app.get('*', (req, res) => {
    res.sendFile(path.join(reactAppPath, 'index.html'));
    });

  // Inicia el servidor
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Servidor GraphQL ejecutándose en http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();


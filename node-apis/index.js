const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
// const Joi = require('joi');
require('dotenv').config();
const Pack = require('./package');
const { routes } = require('./routers/index');

(async () => {
  const server = await new Hapi.Server({
    host: 'localhost',
    port: process.env.PORT || 4000,
    routes:  {
      cors: {
        origin: ["*"],
        exposedHeaders: ["*"],
      }},
  });

  const swaggerOptions = {
    info: {
      title: 'Test API Documentation',
      version: Pack.version,
    },
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  try {
    await server.start();
    console.log('Server running at:', server.info.uri);
    console.log('Swagger running at:', server.info.uri + '/documentation');
  } catch (err) {
    console.log(err);
  }

  server.route(routes);
})();

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
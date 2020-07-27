const Hapi = require('hapi');
const server = new Hapi.Server();
require('env2')('./.env');
const config = require('./config');
const routesIndex = require('./routers');
const shopsRouters = require('./routers/shops');
const ordersRouters = require('./routers/orders');
const pulgin = require('./plugins/hapi-swagger');

server.connection({
    port: config.port,
    host: config.host
});

const init  = async () => {
    await server.register([
        ...pulgin
    ]);
    server.route([
        ...routesIndex,
        ...shopsRouters,
        ...ordersRouters
    ]);
    await server.start();
    console.log(`Server running at ${server.info.uri}`);
};


init();

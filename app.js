const Hapi = require('hapi');
const server = new Hapi.Server();
require('env2')('./.env');
const config = require('./config');
const routesIndex = require('./routers');
const shopsRouters = require('./routers/shops');
const ordersRouters = require('./routers/orders');
const swaggerPulgin = require('./plugins/hapi-swagger');
const paginationPulgin = require('./plugins/hapi-pagination');

server.connection({
    port: config.port,
    host: config.host
});

const init = async () => {
    await server.register([
        ...swaggerPulgin,
        paginationPulgin
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

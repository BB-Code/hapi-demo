const Hapi = require('hapi');
const hapiAuthJWT2 = require('hapi-auth-jwt2');
const server = new Hapi.Server();
const good = require('./plugins/good');
require('env2')('./.env');
const config = require('./config');
const routesIndex = require('./routers');
const shopsRouters = require('./routers/shops');
const ordersRouters = require('./routers/orders');
const usersRouters = require('./routers/users');
const swaggerPulgin = require('./plugins/hapi-swagger');
const paginationPulgin = require('./plugins/hapi-pagination');
const authPulgin = require('./plugins/hapi-auth-jwt2');
server.connection({
    port: config.port,
    host: config.host
});

const init = async () => {
    await server.register([
        good,
        ...swaggerPulgin,
        paginationPulgin,
        hapiAuthJWT2
    ]);
    server.route([
        ...routesIndex,
        ...shopsRouters,
        ...ordersRouters,
        ...usersRouters
    ]);
    authPulgin(server);
    await server.start();
    console.log(`Server running at ${server.info.uri}`);
};


init();

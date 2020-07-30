const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://df2c3df54a9848f185aa683f3c8ce2da@o427468.ingest.sentry.io/5371549' });

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: (req, res) => {
            res('the router is listening')
        },
        config: {
            auth: false,
            tags: ['api', 'tests'],
            description: 'test the api'
        }
    },
    {
        method: 'POST',
        path: '/reportErrorLog',
        handler: async (req, res) => {
            await Sentry.captureException(req.payload);
            res()
        },
        config: {
            tags: ['api', 'report'],
            auth:false,
        }
    }
];
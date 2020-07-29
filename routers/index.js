module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: (req, res) => {
            res('the router is listening')
        },
        config: {
            tags: ['api', 'tests'],
            description: 'test the api'
        }
    }
];
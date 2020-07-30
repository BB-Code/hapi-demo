const good = require('good');

const options = {
    ops: {
        interval: 1000
    },
    reporters: {
        typeFile: [
            {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ ops: '*', }],
            },
            {
                module: 'good-squeeze',
                name: 'SafeJson'
            },
            {
                module: 'good-file',
                args: ['logs/awesome_log']
            }
        ],
        typeConsole: [
            {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*' }]
            },
            {
                module: 'good-console'
            },
            'stdout'
        ],
        // typeHttps: [
        //     {
        //         module: 'good-squeeze',
        //         name: 'Squeeze',
        //         args: [{ error: '*' }]
        //     },
        //     {
        //         module: 'good-http',
        //         args: ['http://localhost:3000',{
        //             wreck:{
        //                 headers:{'x-api-key':'1234'}
        //             }
        //         }]
        //     },

        // ],
        typeHttps: [
            {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ error: '*' }]
            },
            {
                module: 'good-http',
                args: ['http://bobocode.free.idcfengye.com/reportErrorLog',{}]
            },

        ]
    }
}

module.exports = {
    register: good,
    options: options
}
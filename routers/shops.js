const Joi = require('joi');
const GROUP_NAME = 'shops';
module.exports = [
    {
        method: 'GET',
        path: `/${GROUP_NAME}`,
        handler: (req, res) => {
            res('shops router1 is listening')
        },
        config: {
            validate: {
                query:{
                    limit: Joi.number().integer().min(1).default(10).description('每条的条目数'),
                    page: Joi.number().integer().min(1).default(1).description('页码数')
                }
            },
            tags: ['api', GROUP_NAME],
            description: '获取店铺列表'
        }
    },
    {
        method: 'GET',
        path: `/${GROUP_NAME}/{shoId}/goods`,
        handler: (req, res) => {
            res('shops router2 is listening')
        },
        config: {
            validate: {
                params: {
                    shoId: Joi.string().required()
                }
            },
            tags: ['api', GROUP_NAME],
            description: '获取某店铺的商品列表'
        }
    }
];
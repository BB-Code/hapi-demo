const Joi = require('joi');
const models = require('../models');
const { pagenationDefine } = require('../utils/router-helper');
const GROUP_NAME = 'shops';
module.exports = [
    {
        method: 'GET',
        path: `/${GROUP_NAME}`,
        handler: async (req, res) => {
            const { rows: results, count: totalCount } = await models.shops.findAndCountAll({
                attributes: ['id', 'name'],
                limit: req.query.limit,
                offset: (req.query.page - 1) * req.query.limit
            });
            res({ results, totalCount });
        },
        config: {
            tags: ['api', GROUP_NAME],
            validate: {
                query: {
                    ...pagenationDefine
                }
            },
            description: '获取店铺列表'
        }
    },
    {
        method: 'GET',
        path: `/${GROUP_NAME}/{shopId}/goods`,
        handler: async (req, res) => {
            const { rows: results, count: totalCount } = await models.goods.findAndCountAll({
                where: {
                    shop_id: req.params.shopId,
                },
                attributes: ['id', 'name'],
                limit: req.query.limit,
                offset: (req.query.page - 1) * req.query.limit
            });
            res({ results, totalCount })
        },
        config: {
            validate: {
                params: {
                    shopId: Joi.string().required()
                }
            },
            tags: ['api', GROUP_NAME],
            description: '获取某店铺的商品列表'
        }
    }
];
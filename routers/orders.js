const Joi = require('joi');
const models = require('../models');
const { jwtHeaderDefines } = require('../utils/router-helper');
const GROUP_NAME = 'orders';
const timestamps = {
    created_at: new Date(),
    updated_at: new Date()
};
module.exports = [
    {
        method: 'POST',
        path: `/${GROUP_NAME}`,
        handler: async (req, res) => {
            console.log(req.auth.credentials.userId);
            await models.sequelize.transaction((t)=>{
                const result =  models.orders.create({
                    user_id: req.auth.credentials.userId
                }, {
                    transaction: t
                }).then((order) => {
                    const goodsList = [];
                    req.payload.goodsList.forEach((goods) => {
                        console.log(order);
                        goodsList.push(models.order_goods.create({
                            order_id: order.dataValues.id,
                            goods_id: goods.goods_id,
                            single_price: 5.9,
                            count: goods.count,
                            ...timestamps
                        }));
                        console.log(goodsList);
                    });
                    return Promise.all(goodsList);
                });
                return result;
            }).then(() => {
                res('success')
            }).catch(() => {
                res('error')
            });
        },
        config: {
            validate: {
                payload: {
                    goodsList: Joi.array().items(
                        Joi.object().keys({
                            goods_id: Joi.number().integer(),
                            count: Joi.number().integer(),
                        })
                    )
                },
                ...jwtHeaderDefines

            },
            tags: ['api', GROUP_NAME],
            description: '创建订单'
        }
    },
    {
        method: 'POST',
        path: `/${GROUP_NAME}/{orderId}/pay`,
        handler: (req, res) => {
            res('orders router2 is listening')
        },
        config: {
            validate: {
                params: {
                    orderId: Joi.string().required()
                }
            },
            tags: ['api', GROUP_NAME],
            description: '支付某条订单'
        }
    }
];
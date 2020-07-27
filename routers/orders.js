const Joi = require('joi');
const GROUP_NAME = 'orders';
module.exports = [
    {
        method: 'POST',
        path: `/${GROUP_NAME}`,
        handler: (req, res) => {
            res('orders router1 is listening')
        },
        config: {
            validate:{
                payload: {
                    goodsList: Joi.array().items(
                        Joi.object().keys({
                            goods_id: Joi.number().integer(),
                            count: Joi.number().integer(),
                        })
                    )
                },
                headers:Joi.object(
                    {
                        authorization: Joi.string().required()
                    }
                ).unknown(),

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
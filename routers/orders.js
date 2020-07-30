const Joi = require('joi');
const axios = require('axios');
var md5 = require('md5-node');
const xml2js = require('xml2js');
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
        handler: async (req, res) => {
            const user = await models.users.findOne({
                where: { id: req.auth.credentials.userId }
            });
            const openid = user.open_id;
            const options = {
                appid: '绑定支付的APPID',
                mch_id:'商户号', 
                body:'小程序支付',
                nonce_str: Math.random().toString(36).substr(2,15),
                notify_url: '回调地址', 
                openid: openid,//用户关注公众号的openid
                out_trade_no: req.params.orderId, //32位
                spbill_create_ip: req.info.remoteAddress,
                total_fee: 1, //单位分
                trade_type:'JSAPI' //小程序支付的类型
            };
            const getSignData = (rawData,apiKey) => {
                let keys = Object.keys(rawData);
                keys = keys.sort();
                let str = '';
                keys.forEach((key) => {
                    str += `&${key}=${rawData[key]}`;
                });
                str = str.substr(1) + `&key=${ apiKey }`;
                console.log(str);
                data = md5(str).toUpperCase();
                return data;
            };
            //签名
            const sign = getSignData(options,"商户支付密钥");
            console.log('sign:', sign);
            const makeOptions = {
                ...options,
                sign
            };
            const builder = new xml2js.Builder({ rootName: 'xml', headless: true});
            const decodeXml = builder.buildObject(makeOptions);
            console.log("decodeXml", decodeXml)
            const result = await axios({
                url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
                method: 'POST',
                data: decodeXml,
                headers: {'Content-Type':'text/xml'}
            });
            console.log(数据返回);
            console.log(result);
            xml2js.parseString(result,(err,xml) => {
                console.log(xml);
                if(xml){
                    if (xml.return_code[0] === 'SUCCESS'){
                        const resData = {
                            appId: xml.appid[0],
                            timestamp: (Date.now()/1000).toString(),
                            nonceStr: xml.nonce_str[0],
                            package: `prepay_id=${xml.package_id[0]}`,
                            signType: 'MD5'
                        };
                        resData.paySign = getSignData(resData,'商户支付密钥');
                        res(resData);
                    }
                }
            })
            //返回的数据作为小程序的参数传递
            // wx.requestPayment(
            //     {
            //         'timeStamp': '',
            //         'nonceStr': '',
            //         'package': '',
            //         'signType': 'MD5',
            //         'paySign': '',
            //         'success': function (res) { },
            //         'fail': function (res) { },
            //         'complete': function (res) { }
            //     })
        },
        config: {
            validate: {
                params: {
                    orderId: Joi.string().required()
                },
                ...jwtHeaderDefines
            },
            tags: ['api', GROUP_NAME],
            description: '支付某条订单'
        }
    }
];
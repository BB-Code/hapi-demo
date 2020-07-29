const JWT = require('jsonwebtoken');
const GROUP_NAME = 'users';
const Joi = require('joi');
const axios = require('axios');
const decodeData = require('../utils/decrypted-data');
const models = require('../models');

const timestamps = {
    created_at: new Date(),
    updated_at: new Date()
};

module.exports = [{
    method: 'POST',
    path: `/${GROUP_NAME}/createJWT`,
    handler: async (req, res) => {
        const generateJWT = (JWTInfo) => {
            const payload = {
                userId: JWTInfo.userId,
                exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
            };
            return JWT.sign(payload, process.env.JWT_SECRET)
        };
        res(generateJWT({
            userId: 1
        }));
    },
    config: {
        tags: ['api', GROUP_NAME],
        description: '用户JWT签名',
        auth: false //此接口不参与 JWT 的用户验证
    },

}, {
    method: 'POST',
    path: `/${GROUP_NAME}/wxLogin`,
    handler: async (req, res) => {
        const appId = process.env.wxAppId;
        const appSecret = process.env.wxAppSecret;
        const { code, encryptedData, iv } = req.payload;
        const results = await axios({
            url: `https://api.weixin.qq.com/sns/jscode2session`,
            method: 'POST',
            params: {
                appid: appId,
                secret: appSecret,
                js_code: code,
                grant_type: 'authorization_code'
            }
        });
        const { openid, session_key, unionid } = results.data;
        console.log(openid, session_key, unionid)
        const user = await models.users.findOrCreate({
            where: { open_id: openid },
        });
        const userInfo = decodeData(encryptedData, iv, session_key, appId);
        console.log(userInfo);
        await models.users.update({
            nick_name: userInfo.nickName,
            gender: userInfo.gender,
            avatar_url: userInfo.avatarUrl,
            open_id: openid,
            session_key: session_key,
            ...timestamps
        }, {
            where: { open_id: openid }
        });
        const generateJWT = (JWTInfo) => {
            const payload = {
                userId: JWTInfo.userId,
                exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
            };
            return JWT.sign(payload, process.env.JWT_SECRET)
        };
        console.log(user);
        res(generateJWT({
            userId: user[0].id
        }));
    },
    config: {
        auth: false,
        tags: ['api', GROUP_NAME],
        validate: {
            payload: {
                code: Joi.string().required().description('微信登录code'),
                encryptedData: Joi.string().required().description('微信用户信息encryptedData'),
                iv: Joi.string().required().description('微信用户信息iv')
            }
        }
    }
}]
const Joi = require('joi');
const pagenationDefine  = {
    limit: Joi.number().integer().min(1).default(10).description('每页的条目上数'),
    page: Joi.number().integer().min(1).default(1).description('页码数'),
    pagination: Joi.boolean().description('是否开启分页,默认true')
};

const jwtHeaderDefines = {
    headers: Joi.object(
        {
            authorization: Joi.string().required()
        }
    ).unknown(),
}

module.exports = { pagenationDefine, jwtHeaderDefines};


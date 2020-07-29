const crypto = require('crypto');

const decodeData = (encryptedData,iv,session_key,appid) => {
    const new_encrypted_data= Buffer.from(encryptedData,'base64');
    const new_session_key = Buffer.from(session_key,'base64');
    const new_iv = Buffer.from(iv,'base64');

    let decode = '';
    try {
        const result = crypto.createDecipheriv('aes-128-cbc',new_session_key,new_iv);
        result.setAutoPadding(true);//设置自动 padding 为 true，删除填充补位
        decode = result.update(new_encrypted_data,'binary','utf8');
        decode += result.final('utf8');
        decode = JSON.parse(decode);
    } catch (e) {
        throw new Error('解密出错')
    }

    if (decode.watermark.appid !== appid) {
        throw new Error('appid 不对应')
    }

    return decode;
}

module.exports = decodeData;
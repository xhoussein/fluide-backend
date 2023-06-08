const config = require("../config/config")
const jwt = require("jsonwebtoken");
const moment = require("moment");

const generateAuthTokens = async(user) => {
    const accessTokenExpires = moment.utc().add(config.jwt.accessExpirationMinutes, "minutes");
    const accessToken = generateToken(user.id, accessTokenExpires);

    return {
        accessToken: accessToken,
        expires: accessTokenExpires.toDate()
    }
}

const generateToken = (userId, expires, secret = config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
      };
      return jwt.sign(payload, secret);
}

module.exports = {
    generateAuthTokens
}


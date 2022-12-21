const { sign } = require('jsonwebtoken')
require('dotenv').config()

const createAccessToken = userId => {
    return sign({ userId }, process.env.JWT_SECRET_TOKEN, {
        expiresIn: '30d'
    })
}

const createRefreshToken = userId => {
    return sign({ userId }, process.env.JWT_REFRESH_TOKEN, {
        expiresIn: '30d'
    })
}

const sendAccessToken = (req, res, accessToken, user) => {
    res.json({
        accessToken,
        user
    })
}

const sendRefreshToken = (req, res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/refresh_token'
    })
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken,
}
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    generateAccessToken: async (user) => {
        const payload = {
            id: user.id,
            name: user.name,
        };
        
        const token = jwt.sign(payload, process.env.TOKEN_SECRET);
        return token;
    },
    decodePayload: async (token) => {
        return jwt.verify(token, process.env.TOKEN_SECRET);
    },
    encryptPassword: async (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
    },
    isPasswordCorrect: async (password, hash) => {
        return bcrypt.compareSync(password, hash);
    },
}
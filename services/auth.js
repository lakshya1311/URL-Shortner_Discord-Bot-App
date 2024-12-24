const jwt = require("jsonwebtoken");
require('dotenv').config();
const secret = process.env.SECRET;

function setUser(user)
{
    const payload= {
        id:user._id,
        email:user.email,
        role:user.role
    }
    return jwt.sign(payload,secret);
}

function getUser(token)
{
    if(!token)
        return null;

    try {
        return jwt.verify(token,secret);
    } catch (error) {
        return null;
    }
}

module.exports = {
    getUser,setUser
};
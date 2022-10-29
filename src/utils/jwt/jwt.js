const jwt = require('jsonwebtoken');

const generateSign = (id, email) =>{
    return jwt.sign({id, email},process.env.JWT_SECRET,{expiresIn: "7d"});
};

const verifyJWT = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};


module.exports = {
    generateSign,
    verifyJWT
};
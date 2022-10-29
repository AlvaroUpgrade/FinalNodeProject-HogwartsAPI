const User = require('../api/users/users.model');
const {verifyJWT} = require('../utils/jwt/jwt');


const isAuth = async(req,res,next) => {
    try {
        const token = req.headers.authorization
        if(!token){
            return next('unauthorized');
        }
    const parsedToken = token.replace("Bearer ", "");
    const validToken = verifyJWT(parsedToken);
    const userLogged = await User.findById(validToken.id);
    userLogged.password=null;
    req.user= userLogged;
    next();
    } catch (error) {
        return next('access denied: ', error);
    }
};

module.exports = isAuth;

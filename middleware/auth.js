const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next){
    //get the token from the header
    const token = req.header("x-auth-token");
    //check if its not a token
    if(!token) return res.status(400).json({msg: "No Token, authorization denied"});

    //verify existing token
    try{
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        //we attached user to the payload so we can set it to req after its decoded
        req.user = decoded.user;
        next();
    } catch(err){
        res.status(401).json({msg: "token is invalid"});
    }


}
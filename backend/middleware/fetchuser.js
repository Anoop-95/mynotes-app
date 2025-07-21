var jwt = require("jsonwebtoken");
const JWT_SECRET = "anoopisgoodboy$";

const fetchuser = (req, res, next)=>{
    //get user from JWT token and add id to token
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: 'please authenticate with correct tok'})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
        
    } catch (error) {
        res.status(401).send({error: 'please authenticate with correct token'})
        
    }
    

}

module.exports = fetchuser;
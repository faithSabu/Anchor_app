const jwt = require('jsonwebtoken');
const verifyToken = (req,res,next)=>{
try{
    let authHeader = req.headers.authorization;
    if(authHeader==undefined){
        res.status(401).send({error:"no token provided"})
    }else{
        let token = authHeader.split(" ")[1]
    jwt.verify(token,process.env.JWT_SECRET,function(err){
        if(err){
            res.status(500).send({error:"Authentication failed"})
        }
        else{
        console.log('token verified');
            next();
        }
    })
    }
}catch(error){
    console.log(error);
}
   

}; 

module.exports = {verifyToken};
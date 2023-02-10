const jwt = require("jsonwebtoken");

module.exports= async(req,res,next)=>{
    
    try {
        const token = req.headers["authorization"].split(" ")[1];
     

    jwt.verify(token,process.env.JWT_SECRET, (err,decoded)=>{
        if(err){
            return res.status(401).send({message:'Auth failed1',success:false})
        }else{
            req.body.userId = decoded.id;
            console.log("auth success")
            next()
        }
    })

   } catch (error) {
        return res.status(401).send({message:"auth failed2",success:false})
    }
}
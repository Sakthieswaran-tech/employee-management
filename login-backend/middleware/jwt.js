const jwt=require('jsonwebtoken')

const checkToken=(req,res,next)=>{
    try{
        const user={
                empid:"empid",
                email:"id",
                role:"admin"
            }
        const token=req.headers.authorization.split(" ")[1]
        jwt.verify(token,"SECRET KEY")
        const decoded=jwt.decode(token)
        req.user={
            empid:decoded.empid,
            email:decoded.email,
            role:decoded.role
        }
        next()
    }catch(err){
        return res.status(404).json({message:"Auth failed"})
    }
}

module.exports=checkToken
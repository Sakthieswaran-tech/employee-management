const mysql=require("mysql2")
const bcrypt=require("bcrypt")
const con=mysql.createConnection({
    host: HOST,
    user: USERNAME,
    password: PASSWORD,
    database: "loginapp"
})

const createUser=(req,res)=>{
    const sql="INSERT INTO users (name,email,password) VALUES (?,?,?)";
    const {name,email,password}=req.body
    bcrypt.hash(password,5,(err,hash)=>{
        if(err){
            console.log(err);
            return res.status(500).json({error:err})
        }else{
            con.query(sql,[name,email,hash],(error,result,field)=>{
                if(error){
                    console.log(err);
                    return res.status(500).json({error:"Email already taken"})
                }else{
                    return res.status(201).json({message:"User created"})
                }
            })
        }
    })
}

const getUser=(req,res)=>{
    const sql="SELECT * FROM users WHERE email=?"
    const {email,password}=req.body
    con.query(sql,[email],(err,result,field)=>{
        if(err) return res.status(500).json({error:err})
        if(result.length<1) {
            console.log(req.email,req.password);
            console.log(result.length);
            return res.status(404).json({message:"User not found"})
        }
        else{
            console.log(result.length);
            bcrypt.compare(password,result[0].password,(error,resp)=>{
                if(error) {
                    return res.status(500).json({error:error})
                }else if(resp){
                    return res.status(200).json({message:"User found"})
                }else{
                    return res.status(401).json({message:"Unauthorized"})
                }
            })
        }
    })
}


module.exports={
    createUser,
    getUser
}
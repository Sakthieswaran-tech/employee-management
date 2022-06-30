const jwt=require("jsonwebtoken")
const mysql=require("mysql2")
const bcrypt=require("bcrypt")
const con=mysql.createConnection({
    host: HOST,
    user: NAME,
    password: PASSWORD,
    database:DATABASE
})

const createUser=(req,res)=>{
    const sql="INSERT INTO users (firstname,lastname,email,password,role,empid,phonenumber) VALUES (?,?,?,?,?,?,?)";
    const {firstname,lastname,email,password,role,empid,phonenumber}=req.body
    // const regex=/[a-z0-9]@+*.com/i
    // const nameCheck=/[a-zA-Z.]/
    // if(!nameCheck.test(firstname) || !nameCheck.test(lastname)){
    //     return res.status(500).json({message:"Invalid name"})
    // }
    bcrypt.hash(password,5,(err,hash)=>{
        if(err){
            console.log(err);
            return res.status(500).json({error:err})
        }else{
            con.query(sql,[firstname,lastname,email,hash,role,empid,phonenumber],(error,result,field)=>{
                if(error){
                    console.log(error);
                    return res.status(500).json({error:"Email already taken"})
                }else{
                    return res.status(201).json({message:"User created"})
                }
            })
        }
    })
}

const getUser=(req,res)=>{
    const sql="SELECT * FROM users WHERE empid=?"
    con.query(sql,[req.params.empid],(err,result,field)=>{
        if(err){
            return res.status(500).json({error:err});
        }
        if(result.length<1){
            return res.status(404).json({message:"User not available"});
        }else{
            if(req.user.role!=="admin" && req.user.empid!==req.params.empid){
                console.log(req.user.role);
                console.log(req.user.empid);
                console.log(req.params.empid);
                return res.status(401).json({message:"You are not allowed"});
            }else{
                return res.status(200).json({user:result[0]});
            }
        }
    })
}

const getAllUsers=(req,res)=>{
    const sql="SELECT * FROM users WHERE role !='admin'";
    const {email,password}=req.body;
    con.query(sql,(err,result,field)=>{
        if(err){
            return res.status(500).json({error:err});
        }
        if(result.length<1){
            return res.status(404).json({message:"Users not available"});
        }else{
            return res.status(200).json({users:result});
        }
    })
}

const fetchToken=async(req,res)=>{
    const sql="SELECT * FROM users WHERE email=?"
    con.query(sql,[req.body.email],(err,result,field)=>{
        if(err) {
            console.log(err);
            return res.status(500).json({error:err})
        }
        if(result.length<1) return res.status(404).json({message:"User not found"})
        else{
            console.log(result[0].role);
            bcrypt.compare(req.body.password,result[0].password,(error,resp)=>{
                if(error) {
                    console.log(error);
                    return res.status(500).json({error:error})
                }
                else if(resp){
                    const token=jwt.sign(
                        {
                            empid:result[0].empid,
                            email:req.body.email,
                            role:result[0].role
                        },
                        "SECRET KEY")
                    return res.status(200).json({token:token})
                }
                else{
                    return res.status(401).json({message:"Unauthorized"})
                }
            })
        }
    })
}

const deleteUser=(req,res)=>{
    const sql="DELETE FROM users WHERE empid=?";
    con.query(sql,[req.params.empid],(err,result,field)=>{
        if(err){
            return res.status(500).json({error:err});
        }else{
            return res.status(200).json({message:"User deleted"})
        }
    })
}


module.exports={
    createUser,
    getUser,
    getAllUsers,
    fetchToken,
    deleteUser
}
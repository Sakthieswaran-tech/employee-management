const mysql=require('mysql2')

const con=mysql.createConnection({
    host: HOST,
    user: USERNAME,
    password: PASSWORD,
    // database: "loginapp"
})

con.connect(function(err){
    if(err){
        console.log(err);
    }else{
        const sql="CREATE DATABASE loginapp"
        con.query(sql,(er)=>{
            if(er){
                console.log(er);
            }else{
                const populateColumns="CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(40) NOT NULL,email VARCHAR(100) NOT NULL,password VARCHAR(100),UNIQUE(email))"
                con.query(populateColumns,(error)=>{
                    if(error){
                        console.log(error);
                    }else{
                        console.log("Table created");
                    }
                })
            }
        })
    }
})
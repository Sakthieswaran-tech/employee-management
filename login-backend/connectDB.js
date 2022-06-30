const mysql=require('mysql2')

const con=mysql.createConnection({
    host: HOST,
    user: NAME,
    password: PASSWORD,
    database:DATABASE
})


con.connect(function(err){
    if(err){
        console.log(err);
    }else{
        // const sql="CREATE DATABASE emp_mng"
        // con.query(sql,(er)=>{
            // if(er){
                // console.log(er);
            // }
            // else{
                const populateColumns="CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,firstname VARCHAR(40) NOT NULL,lastname VARCHAR(40) NOT NULL,phonenumber VARCHAR(10) NOT NULL,email VARCHAR(100) NOT NULL,password VARCHAR(100),role VARCHAR(40),empid VARCHAR(10),UNIQUE(email,phonenumber,empid))"
                // const populateColumns="DROP TABLE users"
                con.query(populateColumns,(error)=>{
                    if(error){
                        console.log(error);
                    }else{
                        console.log("Table created");
                    }
                })
            // }
            // else{
            //     console.log("done");
            // }
        }
    }
)
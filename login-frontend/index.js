const BASE_URL="(give the host url here)/users"
const contentType='application/json;charset=utf-8'

function login(){
    const form=document.getElementById("signinform");
    const email=form[0].value;
    const password=form[0].value;
    if(email.length<1 || password.length<1){
        alert("Provide the required credentials");
        return;
    }
    let data={
        method:'POST',
        headers:{
            'Content-Type':contentType
        },
        body:JSON.stringify({email,password})
    }
    let fetchreq=fetch(`${BASE_URL}/login`,data);
    fetchreq.then(res=>{
        if(res.status==200){
            window.location.href="home.html"
            console.log(res.status);
        }
        else if(res.status===401){
            alert("Incorrect password")
        }else if(res.status===404){
            alert("Incorrect email")
        }
    })
}
function intent(){
    window.location.href="signup.html"
}
function createUser() {
                const form = document.getElementById("signupform");
                const name=form[0].value;
                const email=form[1].value;
                const password=form[2].value;
                if(name.length<1 || password.length<1 || email.length<1){
                    alert("Provide the required details");
                    return;
                }
                let detail = {
                    method: 'POST',
                    headers: {
                        'Content-Type': contentType
                    },
                    body: JSON.stringify({name,email,password})
                }
                let fetchreq = fetch(BASE_URL, detail);
                fetchreq.then(res => {
                    if(res.status===201){
                        alert("User created")
                        window.location.href="index.html"
                    }
                    else if(res.status==500){
                        alert("Email already exists")
                    }else{
                        alert("Something went wrong")
                    }
            }).catch(err=>{
                console.log(err);
                alert("Something went wrong,check the log")
            })
}

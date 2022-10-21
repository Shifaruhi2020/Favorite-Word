import React, { useState } from "react";
import {Link,useNavigate} from "react-router-dom"
import { useAlert } from "react-alert";
import "../Css/Login.css"
function Login() {
    const [email, setEmaillog] = useState(" ");
    const [password, setPasswordlog] = useState(" ");
  

    const navigate=useNavigate();
    const alert = useAlert(); 
    let uid=localStorage.getItem("user_id");
  
    async function handleLogin(e) {
      e.preventDefault();

  
      let data={email,password}
      try{
        let result=await fetch('http://127.0.0.1:8000/login',{
          method:'POST',
          headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
          },
          body:JSON.stringify(data)  
         
        });
       result =await result.json();
       

      if((await result).status ===400)
        {
          alert.show(result.message, { type: "error" });
          
        }
        else{
          alert.show("Logged-In Success", { type: "success" });
          navigate("/search")
          localStorage.setItem("user",JSON.stringify(result.user))  
          localStorage.setItem("email",(result.user.email))
          localStorage.setItem("user_id",(result.user.id))
         
          window.location.reload(true);
        } 
      }
  
        
      catch(e){
        console.log(e)
       
      }
  }

  const handleClick = () => {
    // 👇️ navigate to /contacts
    if(uid){
           navigate('/search');
    }
   
  };
  
// localStorage.setItem("email")
// localStorage.setItem("user_id")


// alert(localStorage.getItem('email'));
// alert(localStorage.getItem('user_id'));


  return (
   <>
    
      <div className="wrap">
      <form onSubmit={handleLogin}>
        <div className="form-cont-1">
          <h1>Sign In</h1>
          
        </div>
        <p className="form-cont-6">
          <p>Email address </p>
             <input
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              required
              onChange={(event) => setEmaillog(event.target.value)}
            />
        </p>
       
        <div className="form-cont-2">
          {/* <div className="pass-cont"> */}
            <p>Password</p>
           <input
              type="password"
              id="password"
              placeholder="Enter your password"
              name="password"
              required
              onChange={(event) => setPasswordlog(event.target.value)}
            />
          {/* </div> */}

       
          <div >
           {/* <button className="button">Sign In</button><br/> */}
            <button  className="Link" onClick={handleClick}> Sign In<br/>
            </button>
           </div><br/>
       
           <div className="form-cont-5">
            <Link to="/register" className="Link" to="/register"><br/>
              Create an account
            </Link>
            </div>
        </div>
      </form>
      <div className="float circle c-1"></div>
      <div className="float circle c-2"></div>
      <div className="float circle c-3"></div>
      {/* <div className="float line l-1"></div>
      <div className="float line l-2"></div>
      <div className="float line l-3"></div> */}
    </div>
    <div className="main-wrapper2">
      <div className="border-line"></div>
    </div>
    
    </>
  );
}


export default Login;

import React,{useState} from 'react'
import {  Alert } from "react-bootstrap";
import { Link,useNavigate } from 'react-router-dom';
import "../Css/Registration.css"
 function Registration() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setusername] = useState();
  var uid=localStorage.getItem("user_id")

  const navigate=useNavigate();
  const [flag, setFlag] = useState(false);
  const [login, setLogin] = useState(true);
  // const uid=localStorage.getItem("user_id");
  async function handleFormSubmit(e) {
    e.preventDefault();


     let data={name,username,email,password}
     try{
       let result=await fetch('http://127.0.0.1:8000/register',{
         method:'POST',
         headers:{
           'Accept':'application/json',
           'Content-type':'application/json',
         },
         body:JSON.stringify(data)  
       });

      result =await result.json();
      localStorage.setItem("user",JSON.stringify(result.user)) 
      localStorage.setItem("email",(result.user.email))
      localStorage.setItem("user_id",(result.user.id)) 
       console.log(result)
     } catch(e){
       console.log(e)
     }

     navigate("/search");  
      window.location.reload(true); 

    
  }


// const handleClick = () => {
//     // 👇️ navigate to /contacts
//     if(localStorage.getItem("user_id")){
//            navigate('/search');
//     }


// localStorage.setItem("email")
// localStorage.setItem("user_id")


// alert(localStorage.getItem('email'));
// alert(localStorage.getItem('user_id'));
 
 const handleClick = () => {
    // 👇️ navigate to /contacts
    if(uid){
           navigate('/search');
    }
   
  };





  return (
    <>  
    <div class="main-wrap">
    <form onSubmit={handleFormSubmit}>
    <div class="form-cont-1">
      <h1>Sign Up</h1>
      </div>
            <div class="cont-1">
            <p>Name</p>
           <input
                  type="text"
                  
                  required
                  placeholder="Enter Full Name"
                  name="name"
                  className='login-input'
                  onChange={(event) => setName(event.target.value)}
                />
                </div>
        

      <div class="cont-2">
         <p>User Name</p>
           <input
                  type="text"
                  
                  required
                  placeholder="Enter User Name"
                  name="User Name"                 
                  onChange={(event) => setusername(event.target.value)}
                />
        </div>

        <div class="cont-3">
          <p>Email address </p>
         <input
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              required
               onChange={(event) => setEmail(event.target.value)}
            />
        </div>
         
        <div class="cont-4">
          <div class="pass-cont">
            <p>Password</p>
             <input
              type="password"
              id="password"
              placeholder="Enter your password"
              name="password"
              required
             onChange={(event) => setPassword(event.target.value)}
            />
          </div>
           <br/>
          <div >
           <button className="button" onClick={handleClick}  >Sign In</button>
           </div>
            
      <div className="form-cont-5"> 
      Already Have account? <Link className="link" to="/">Login</Link></div>
      </div>

       
      </form>
      <div class="float circle c-1"></div>
      <div class="float circle c-2"></div>
      <div class="float circle c-3"></div>
      {/* <div class="float line l-1"></div> */}
      {/* <div class="float line l-2"></div>
      <div class="float line l-3"></div> */}
    </div>
    <div class="main-wrapper2">
      <div class="border-line"></div>
    </div>
    </>
  );
}

export default Registration;
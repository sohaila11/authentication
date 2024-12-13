import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { FaUser, FaLock, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
const LoginForm = () => {
  
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [action, setAction] = useState("");
  const [firstName,setFirstName]= useState("");
  const [lastName,setLastName]= useState("");
  const [phoneNumber,setNumber]= useState("");
  const [email,setEmail]= useState("");
  const [userPassword,setUserPassword]= useState("");



  const registerLink = () => {
    setAction("active");
  };
  const loginLink = () => {
    setAction("");
  };

  /*const navigate = useNavigate();
    useEffect(()=>{
        if (localStorage.getItem('user-info')){
            //navigate("/add");
        }
    },[navigate])*/

  async function signUp(e){
    let item ={firstName,lastName,phoneNumber,email,userPassword}
    e.preventDefault();
    let result = await fetch("https://heartofafrica.runasp.net/Account/registration",{
      method:"POST",
      body: JSON.stringify(item),
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }) 
    result = await result.json()
    localStorage.setItem("user-info", JSON.stringify(result));
    console.log("result",result)
  }
  async function login(e) {
    let item = { userName, password };
    console.log(item);
    e.preventDefault();
    let result = await fetch("https://heartofafrica.runasp.net/Account/Login", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user-info", JSON.stringify(result));
    //navigate("/add")
  }
  return (
    <div className={`wrapper${action}`}>
      <div className="login">
        <h1>Login</h1>
        <form>
          <label>User Name</label>
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter Your Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className="icon1" />
          </div>
          <div className="input-box">
            <label>Password</label>
            <input
              type="Password"
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="icon2" />
          </div>
          <div className="pass">
            <a href="#">forget password?</a>
          </div>
          <button onClick={login}>submit</button>
          <br />
          <div className="register-link">
            <p>
              Don't have an account?
              <a href="#" onClick={registerLink}>
                Regitser
              </a>
            </p>
          </div>
        </form>
      </div>
      <div className="signup">
        <h1>Sign Up</h1>
        <form>
          <label>First Name</label>
          <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}placeholder="Enter Your First name" required />
          <FaUser className="icon1" />
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}placeholder="Enter Your Last name" />
          <FaUser className="icon2" />
          <label>Phone number</label>
          <input type="text" value={phoneNumber} onChange={(e)=>setNumber(e.target.value)}placeholder="Enter Your Phone" />
          <FaPhoneAlt className="icon3" />
          <div className="email">
            <label>Email</label>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}placeholder="Enter Your Email" />
            <FaEnvelope className="icon4" />
          </div>
          <label>Password</label>
          <input type="Password" value={userPassword} onChange={(e)=>setUserPassword(e.target.value)}placeholder="Enter Your Password" />
          <FaLock className="icon5" />
          <button onClick={signUp}>sign up</button>
          <div className="register-link">
            <p>
              Already have an account?
              <a href="#" onClick={loginLink}>
              
                Login
              </a>
            </p>
          </div>
          <br />
        </form>
      </div>
    </div>
  );
};
export default LoginForm;

import React, { useContext,useEffect,useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import "../styles/login.css";
import {useAuth} from "../authProvider.js";
const {Navigate}=require("react-router-dom");


const Login = ({ person,setPerson }) => {
  const { login,signup } = useAuth();
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role is student
  const [error, setError] = useState('');
  const [loggedIn,setloggedIn]=useState(false);
  const [switchs,setSwitch]=useState(true);
  const [email,setEmail]=useState("");
  const handleLogin = async () => {
    login(username,password,role,setloggedIn,setError);
  };
  const handleSignUp=async()=>{
    signup(email,username,password,role,setloggedIn,setError);
  }
  if(loggedIn){
    return <Navigate replace to="/"/>
  }
  return (
    <div>
    <nav className='navbar'>
    <div className='navbar_left'>
    <a href="/"><img src="/images/back.png" width="50vw"/></a>
    <div><img src='/images/logo.png' alt='logo' width="90vw"/>
    <p className='educraft'>Edu Craft</p></div></div>
    <div className='navbar_right'><a href=""><img src="/images/notification.png" alt="notify" width="25vw" height="35vh"/></a>
    {(localStorage.getItem("loggedIn")&& person!=="")?<h2 style={{fontSize: "20px",fontWeight: "700"}}>{person}</h2>:<a className='login' href='/login'>Login/SignUp</a>}
    <a href="/login"><img src="/images/login.png" alt="login" width="50vw" height= "50vh"/></a>
    </div>
  </nav>
  <div className='login-container1'>
    <div className='login-container2'>
   {switchs? <div className="login-container">
      <h2 className='login_header'>Login</h2>
      <div className="input-container">
        <label className='label_name'>Name:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label className='label_name'>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label className='label_name'>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>
      <button onClick={handleLogin} className='login_page'>Login</button>
      <button onClick={()=>setSwitch(false)} className='new_user'>Create new account</button>
      {error && <p className="error-message">{error}</p>}
    </div>:<div className='login-container'><h2 className='login_header'>SignUp</h2>
    <div className="input-container">
        <label className='label_name'>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label className='label_name'>Name:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label className='label_name'>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label className='label_name'>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>
      <button onClick={handleSignUp} className='login_page'>Register</button>
      <button onClick={()=>setSwitch(true)} className='new_user'>Already Registered? Login</button>
      {error && <p className="error-message">{error}</p>}</div>
}
    </div>
    <div className='images'><img src='/images/main_login.png'width="500vw"/></div>
    </div>
    </div>
  );

};

export default Login;

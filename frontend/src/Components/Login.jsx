import React,{useState} from "react";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login=(props)=> {
   
  const [credentials, setCredentials] = useState({email: "", password: ""})
  let history = useNavigate();
  
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const response = await fetch("http://localhost:3000/api/auth/login",{
        method: 'POST',
        headers: {
          'Content-type': "application/json",
          
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,}),
        
      });
      

      
      const json = await response.json(); 
      
      if(json.success){
        localStorage.setItem('token', json.authtoken);
        toast.success("Login successful!");
        history("/")

      }
      else{
        toast.error(json.error);
      }

    }catch(err){
      console.error("Error:", err)
    }
    
      
  }
  
  const onChange=(e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  
  }
  
   
  return (
<div
  className="container-fluid d-flex justify-content-center align-items-center"
  style={{ minHeight: '100vh', backgroundColor: '#d7dae0ff', marginTop: '0px' }}
>
  <div
    className="shadow rounded row"
    style={{
      width: '90%',
      maxWidth: '900px',
      overflow: 'hidden',
      backgroundColor: '#fff',
      minHeight: '80vh',
    }}
  >
    {/* Left side */}
    <div
      className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center text-white"
      style={{ backgroundColor: '#1e40af', padding: '2rem' }}
    >
      <div className="text-center">
        <img
          src="./login_pic.jpg"
          alt="avatar"
          style={{ width: '15 rem', marginBottom: '1rem', height: '15.5rem', borderRadius: '10%' }}
        />
        <h3>Login to be Verified</h3>
        <p>Join experienced designers on this platform.</p>
      </div>
    </div>

    {/* Right side */}
    <div
      className="col-12 col-md-6 p-5 d-flex flex-column justify-content-center"
    >
      
      <h4>Hello, Again</h4>
      <p className="text-muted">We are happy to have you back.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" id="email" value={credentials.email} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input className="form-control" name="password" id="password" type="password" value={credentials.password} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
      <p className="mt-3 text-center">
        Don’t have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  </div>
</div>

  )
}


export default Login

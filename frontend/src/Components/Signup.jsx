import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

const Signup = (props) => {
  
  let history = useNavigate();
  const [credentials, setCredentials] = useState({name: "", email: "", password: ""})
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const {name, email, password} = credentials;
    try {
      const response = await fetch("http://localhost:3000/api/auth/Createuser",{
        method: 'POST',
        headers: {
          'Content-type': "application/json",
          
        },
        body: JSON.stringify({name, email, password}),
        
      });
      const json = await response.json(); 
      
      if(json.success){
        localStorage.setItem('token', json.authtoken);
        toast.success("Account created successfully!");

        history("/")
        
        

      }
      else{
        toast.error("Enter all fields correctly!");
       
      }

      
    }
    catch(error) {
     
    }
    
    
  }
  const handleChange=(e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  } 
  return (  
    <div
  className="container-fluid d-flex justify-content-center align-items-center"
  style={{ minHeight: '100vh', backgroundColor: '#d7dae0ff' }}
>
  <div
    className="shadow rounded row"
    style={{
      width: '90%',
      maxWidth: '900px',
      overflow: 'hidden',
      backgroundColor: '#fff',
      minHeight: '80vh',
      marginTop: '2rem',
      marginBottom: '2rem'
    }}
  >
    {/* Left side */}
    <div
      className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center text-white"
      style={{ backgroundColor: '#1e40af', padding: '2rem' }}
    >
      <div className="text-center">
        <img
          src="./signup_pic.png"
          alt="avatar"
          style={{ width: '12rem', marginBottom: '1rem', height: '18.5rem', borderRadius: '10%' }}
        />
        <h3>Register Here to</h3>
        <p>Start creating your notes.</p>
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
          <label htmlFor="name" className="form-label">Name </label>          
          <input type="text" className="form-control" name="name" id="name" value={credentials.name} onChange={handleChange}  />
         </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" id="email" value={credentials.email} onChange={handleChange}  />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input className="form-control" name="password" id="password" type="password" value={credentials.password} onChange={handleChange} minLength={3} maxLength={10} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
      <p className="mt-3 text-center">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  </div>
</div>
  )
}

export default Signup


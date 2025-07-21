import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function Navbar() {
  const Navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/login");
  }
  return (<>
  <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/" style={{fontFamily: 'Arial, sans-serif', fontWeight: 'semi-bold'}}>My Notes</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     
      <form className="d-flex ms-auto">
        {localStorage.getItem("token") ? (<Link className="btn btn-info mx-2 d-none" to="/login" role="button">Login</Link>): (<Link className="btn btn-success mx-2" to="/login" role="button">Login</Link>)}
        {localStorage.getItem("token") ? <button type='button' className="btn btn-danger" onClick={handleLogout}>Logout</button> : (<Link className="btn btn-primary mx-2" to="/signup" role="button">Sign up</Link>)}
      </form>
      
    </div>
  </div>
</nav>
  
</>
    
  )
    
}

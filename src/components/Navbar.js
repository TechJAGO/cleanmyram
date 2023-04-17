import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout =()=>{
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Clean My Ram</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active " aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('token')?<div class="btn-group">  
  <Link to="/login" class="btn btn-outline-light my-2" aria-current="page">Login</Link>
  <Link to="/register" class="btn btn-outline-light my-2">Register</Link>

</div>:<button onClick={handleLogout} className="btn btn-outline-light">Logout</button>}
    </div>
  </div>
</nav>
  )
}

export default Navbar

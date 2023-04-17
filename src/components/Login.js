import React, { useState } from "react";
// import { unstable_HistoryRouter } from "react-router-dom";
import {useNavigate} from 'react-router-dom';

function Login(props) {
  const [Credential, setCredential] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: Credential.email, password: Credential.password })
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      // save the auth token and redirect.
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Logged in successfully", "success")
    }
    else {
      props.showAlert ("Invalid Credentials", "Danger")
    }
  };

  const onChange = (e) => {
    setCredential({ ...Credential, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={Credential.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={Credential.password}
            onChange={onChange}
            id="password"
            name="password" />
        </div>

        <button type="submit" className="btn btn-outline-secondary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png"
import email_icon from "../assets/email.png"
import password_icon from "../assets/password.png"
import close_icon from "../assets/close.png"

const Register = () => {
// State variables for form inputs
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

// Redirect to home
  const gohome = ()=> {
    window.location.href = window.location.origin;
  }

// Handle form submission
  const register = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate inputs
    if (!userName.trim() || !password.trim() || !email.trim() || !firstName.trim() || !lastName.trim()) {
      setError("All fields are required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    let register_url = window.location.origin+"/djangoapp/register";

    try {
      const res = await fetch(register_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "userName": userName,
          "password": password,
          "firstName": firstName,
          "lastName": lastName,
          "email": email
        }),
      });

      const json = await res.json();
      if (json.status === "Authenticated") {
        sessionStorage.setItem('username', json.userName);
        setSuccess("Registration successful! Redirecting...");
        setTimeout(() => {
          window.location.href = window.location.origin;
        }, 1500);
      }
      else if (json.error === "Already Registered") {
        setError("Username already exists. Please choose a different username.");
      } else {
        setError(json.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return(
    <div className="auth-page">
      <div className="register_container">
      <div className="header">
          <div>
            <span className="text">Create account</span>
            <p>Join the dealership review network.</p>
          </div>
          <div>
          <a href="/" onClick={()=>{gohome()}}>
            <img style={{width:"1cm"}} src={close_icon} alt="X"/>
          </a>
          </div>
        </div>

        {error && <div className="form-message error">{error}</div>}
        {success && <div className="form-message success">{success}</div>}

        <form onSubmit={register}>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} className="img_icon" alt='Username'/>
            <input type="text" name="username" placeholder="Username" className="input_field" onChange={(e) => setUserName(e.target.value)} disabled={loading}/>
          </div>
          <div>
            <img src={user_icon} className="img_icon" alt='First Name'/>
            <input type="text" name="first_name" placeholder="First Name" className="input_field" onChange={(e) => setFirstName(e.target.value)} disabled={loading}/>
          </div>

          <div>
            <img src={user_icon} className="img_icon" alt='Last Name'/>
            <input type="text" name="last_name" placeholder="Last Name" className="input_field" onChange={(e) => setlastName(e.target.value)} disabled={loading}/>
          </div>

          <div>
            <img src={email_icon} className="img_icon" alt='Email'/>
            <input type="email" name="email" placeholder="email" className="input_field" onChange={(e) => setEmail(e.target.value)} disabled={loading}/>
          </div>

          <div className="input">
            <img src={password_icon} className="img_icon" alt='password'/>
            <input name="psw" type="password" placeholder="Password (min 6 chars)" className="input_field" onChange={(e) => setPassword(e.target.value)} disabled={loading}/>
          </div>

        </div>
        <div className="submit_panel">
          <input className="submit" type="submit" value={loading ? "Registering..." : "Register"} disabled={loading}/>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Register;

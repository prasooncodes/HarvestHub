import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import url from '../url';

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    name: "",
    password: "",
  });
  const { email, password, name } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
      toast.error(err, {
        position: "bottom-left",
      });
  
  const handleSuccess = (msg) =>
      toast.success(msg, {
        position: "top",
      });
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${url}/signup`,
          {
            ...inputValue,
          },
          { withCredentials: true }
        );
        const { success, message, token } = data;
        if(token){
          Cookies.set('token', token, { expires: 7 });
        }
        if (success) {
          handleSuccess(message);
          setTimeout(() => {
            navigate("/Landing");
          }, 1000);
        } else {
          handleError(message);
        }
      } catch (error) {
        console.error("Signup error:", error);
        
        if (error.response && error.response.status === 409) {
          handleError("This email is already registered. Please use a different email or log in.");
        } else {
          handleError(error.response?.data?.message || "An error occurred during signup. Please try again.");
        }
      }
      setInputValue({
        ...inputValue,
        email: "",
        password: "",
        name: "",
      });
    };
  
  return (
    <div className="signup_container" style={{ 
      backgroundImage: `url("LOGIN.png")`, 
      backgroundSize: "cover",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div className="form_container" style={{
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h1 style={{
          marginTop: 0,
          marginBottom: "1rem",
          fontFamily: "Montserrat, Lato", 
          fontStyle: "bold", 
          fontSize: "60px",
          color: "#5FAD8C",
          textAlign: "center"
        }}>Harvest Hub</h1>
        
        <h2 style={{
          marginTop: "1rem",
          marginBottom: "1.5rem",
          textAlign: "center"
        }}>Join Harvest Hub</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-floating" style={{ marginBottom: "1rem" }}>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
              required
              style={{ padding: "0.75rem" }}
            />
            <label htmlFor="email">Email</label>
          </div>
          
          <div className="form-floating" style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your Name"
              onChange={handleOnChange}
              required
              style={{ padding: "0.75rem" }}
            />
            <label htmlFor="name">Name</label>
          </div>
          
          <div className="form-floating" style={{ marginBottom: "1.5rem" }}>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
              required
              style={{ padding: "0.75rem" }}
            />
            <label htmlFor="password">Password</label>
          </div>
          
          <button type="submit" style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#5FAD8C",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem",
            marginBottom: "1rem"
          }}>Sign Up</button>
          
          <span style={{
            display: "block",
            textAlign: "center",
            marginTop: "1rem"
          }}>
            Already have an account? <Link to={"/login"} style={{ color: "#5FAD8C" }}>Login</Link>
          </span>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default Signup;
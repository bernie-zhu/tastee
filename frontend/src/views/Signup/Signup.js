import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
/* eslint-disable */

const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [err, setErr] = useState("");

    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {{
        setData({...data, [input.name]: input.value });
    }};

    const handleSubmit = async (err) => {
        err.preventDefault();

        try {
            const url = "http://localhost:4000/signup";
            const { data: res } = await axios.post(url, data);
            navigate("/login");
            console.log(res.message);
        } catch (err) {
            if (err.response && err.response.status >= 400 && err.response.status <= 500) {
                setErr(err.response.data.message);
            }
        }
    }

    return (
              <form onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
        
                <div className="mb-3">
                  <label>First name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    value={data.firstName}
                    required
                    onChange={handleChange}
                  />
                </div>
        
                <div className="mb-3">
                  <label>Last name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Last name" 
                    value={data.lastName}
                    required
                    onChange={handleChange}
                  />
                </div>
        
                <div className="mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={data.email}
                    required
                    onChange={handleChange}
                  />
                </div>
        
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={data.password}
                    required
                    onChange={handleChange}
                  />
                </div>

                {err && <div> {err} </div>}
        
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </div>
        
                <p className="forgot-password text-right">
                  Already registered? <a href="/login">Login</a>
                </p>
              </form>
            )
}

export default Signup;
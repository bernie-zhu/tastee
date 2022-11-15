import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
/* eslint-disable */

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [err, setErr] = useState("");

    //const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {{
        setData({...data, [input.name]: input.value });
    }};

    const handleSubmit = async (err) => {
        err.preventDefault();

        try {
            const url = "http://localhost:4000/login";
            const { data: res } = await axios.post(url, data);
            //navigate("/login");
            window.location("/");
            console.log(res.message);
        } catch (err) {
            if (err.response && err.response.status >= 400 && err.response.status <= 500) {
                setErr(err.response.data.message);
            }
        }
    }

      return (
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>

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
              Sign In
            </button>
          </div>

          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
        </form>
      )
  }

export default Login;
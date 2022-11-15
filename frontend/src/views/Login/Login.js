import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
/* eslint-disable */

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [err, setErr] = useState("");

    //const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
        //console.log(data)
    };

    const handleSubmit = async (err) => {
        err.preventDefault();

        try {
            const url = "http://localhost:4000/api/login";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            window.location = "/";
            console.log(res.message);
        } catch (err) {
            if (err.response && err.response.status >= 400 && err.response.status <= 500) {
                console.log(err)
                setErr(err.response.data.message);
            } else {
                console.log(err)
            }
        }
    }

      return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={'/'}>
                        Tastee
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/login'}>
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/signup'}>
                                    Sign up
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <form onSubmit={handleSubmit}>
                <h3>Login</h3>

                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Enter email"
                        defaultValue={data.email}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                        defaultValue={data.password}
                        required
                        onChange={handleChange}
                    />
                </div>

                {err && <div className="error_msg"> {err} </div>}

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </div>

                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        </div>
      )
  }

export default Login;
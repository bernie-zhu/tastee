import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
/* eslint-disable */

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);

    const handleToggle = () => {
        if (type == "password") {
            setIcon(eye);
            setType("text");
        } else {
            setIcon(eyeOff);
            setType("password");
        }
    }


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
            window.location = "/home";
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
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={'/home'}>
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
            <div className="auth-wrapper">
                <div className="auth-inner">
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

                        <label>Password</label>
                        <div className="mb-3 input-group">
                            <input
                                type={type}
                                name="password"
                                className="form-control border-end-0"
                                placeholder="Enter password"
                                defaultValue={data.password}
                                required
                                onChange={handleChange}
                            />
                            <span onClick={handleToggle} className="input-group-text bg-white" >
                                <span className="bg-transparent">
                                    <Icon icon={icon} size={15}/>
                                </span>
                            </span>
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
            </div>
        </div>
      )
  }

export default Login;
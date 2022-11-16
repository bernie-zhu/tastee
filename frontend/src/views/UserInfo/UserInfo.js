import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
/* eslint-disable */

const UserInfo = () => {
    const token = localStorage.getItem("token");

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        height: "",
        weight: "",
        age: "",
        gender: "male"
    })

    const getUser = async () => {
        const url = "http://localhost:4000/api/userinfo";
        const { data } = await axios.get(url, config);
        //console.log(data);
        setUserData(data.data);
      }
  
    useEffect(() => {
    //console.log("called")
    getUser();
    }, []);

    const [err, setErr] = useState("");
    const [success, setSuccess] = useState(false);
    const [errBool, setErrBool] = useState(false);

    const handleChange = ({ currentTarget: input }) => {{
        setUserData({...userData, [input.name]: input.value });
        //console.log(newUserData);
        //console.log(userData);
    }};

    const handleSubmit = async (err) => {
        err.preventDefault();

        try {
            //console.log("submit1");
            const url = "http://localhost:4000/api/userinfo";
            //console.log("submit2");
            //console.log(config)
            const { data: res } = await axios.put(url, userData, config);
            //console.log("submit3");
            //console.log(res.message);
            setSuccess(true);
            setErrBool(false);
        } catch (err) {
            //console.log(err);
            if (err.response && err.response.status >= 400 && err.response.status <= 500) {
                setErr(err.response.data.message);
                setSuccess(false);
                setErrBool(true);
            }
        }
    }

    const config = {
      headers: {
        "auth-token": token
      }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }
    
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/home'}>
              Tastee
            </Link>
            <div className="collapse navbar-collapse justify-content-between" id="navbarTogglerDemo02">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to={'/home'}>
                        Home
                    </Link>
                </li>
              </ul>
              <ul className="nav navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link">Hello, {userData.firstName} </a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown">
                    More
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item">User Information</a>
                    <a className="dropdown-item" onClick={handleLogout}>Logout</a>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>  

        <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={handleSubmit}>
                        <h3>Update Information</h3>
                
                        <div className="mb-3">
                            <label>First name</label>
                            <input
                                type="text"
                                name="firstName"
                                className="form-control"
                                placeholder="First name"
                                defaultValue={userData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                
                        <div className="mb-3">
                            <label>Last name</label>
                            <input 
                                type="text" 
                                name="lastName"
                                className="form-control" 
                                placeholder="Last name" 
                                defaultValue={userData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                
                        <div className="mb-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email"
                                defaultValue={userData.email}
                                onChange={handleChange}
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
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div className="row mb-3">
                            <div className="form-group col-md-4">
                                <label>Height (in)</label>
                                <input
                                    type="number"
                                    name="height"
                                    className="form-control"
                                    placeholder="Height"
                                    defaultValue={userData.height}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label>Weight (lbs) </label>
                                <input
                                    type="number"
                                    name="weight"
                                    className="form-control"
                                    placeholder="Weight"
                                    defaultValue={userData.weight}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label>Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    className="form-control"
                                    placeholder="Age"
                                    defaultValue={userData.age}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="male" checked={userData.gender=="male"} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="inlineRadio1"> Male </label>
                        </div>
                        <div className="form-check form-check-inline mb-3">
                            <input className="form-check-input" type="radio" name="gender" id="inlineRadio2" value="female" checked={userData.gender=="female"} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="inlineRadio2"> Female </label>
                        </div>

                        {errBool && <div className="error_msg"> {err} </div>}
                        {success && <div className="success_msg"> Successfully applied! </div>}
                
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Apply
                            </button>
                        </div>
                    </form>
                </div>
            </div>
      </div>
    )
};

export default UserInfo;
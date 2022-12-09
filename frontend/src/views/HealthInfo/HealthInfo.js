import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import HomeNav from "../../components/HomeNav";
/* eslint-disable */

const HealthInfo = () => {
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

    const [userHealthData, setHealthData] = useState({
        bmi: 0.0, 
        bmr: 0.0,
        required_calories: 0.0,
        bmi_class: "Normal Weight",
        physical_factor: 1
    })

    const processUserHealthInfo = () => {
        var data = {
            bmi: 0.0, 
            bmr: 0.0,
            required_calories: 0.0,
            bmi_class: "Normal Weight",
            physical_factor: 1
        }
        data.bmi = (userData.weight)/(userData.height**2)*703;

        if(userData.gender == "male") {
            data.bmr = 66 + (6.23*userData.weight) + (12.7*userData.height) - (6.8*userData.age);
        } else {
            data.bmr = 655 + (4.35*userData.weight) + (4.7*userData.height) - (4.7*userData.age);
        }

        if(data.bmr < 18.5) {
            data.bmi_class = "UnderWeight";
        } else if(18.5 <= data.bmr < 25) {
            data.bmi_class = "Normal Weight";
        } else if(25 <= data.bmr < 30) {
            data.bmi_class = "Overweight";
        } else {
            data.bmi_class = "Obese";
        }

        data.required_calories = bmr*userHealthData.physical_factor;

    }

    const getUser = async () => {
        const url = "http://localhost:4000/api/userinfo";
        const { data } = await axios.get(url, config);
        //console.log(data);
        setUserData(data.data);
        processUserHealthInfo();
    }
  
    useEffect(() => {
    //console.log("called")
    getUser();
    }, []);

    const [err, setErr] = useState("");
    const [success, setSuccess] = useState(false);
    const [errBool, setErrBool] = useState(false);
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);

    const handleChange = ({ currentTarget: input }) => {{
        setUserData({...userData, [input.name]: input.value });
        //console.log(newUserData);
        //console.log(userData);
    }};

    const handleToggle = () => {
        if (type == "password") {
            setIcon(eye);
            setType("text");
        } else {
            setIcon(eyeOff);
            setType("password");
        }
    }

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
        <HomeNav />

        <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={handleSubmit}>
                        <h3>Health Information</h3>
                
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

                        <label>Password</label>
                        <div className="mb-3 input-group">
                            <input
                                type={type}
                                name="password"
                                className="form-control border-end-0"
                                placeholder="Enter password"
                                required
                                onChange={handleChange}
                            />
                            <span onClick={handleToggle} className="input-group-text bg-white" >
                                <span className="bg-transparent">
                                    <Icon icon={icon} size={15}/>
                                </span>
                            </span>
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

export default HealthInfo;
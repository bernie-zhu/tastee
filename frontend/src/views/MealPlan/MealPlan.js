import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select'
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import HomeNav from "../../components/HomeNav";
import { timeFrame_options, diet_options } from "../../components/Data";
/* eslint-disable */

const MealPlan = () => {
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

    const [mealPlanSettings, setMealPlanSettings] = useState({
        timeFrame: timeFrame_options[0],
        calroieCount: 2000.0,
        diet: diet_options[diet_options.length-1]
    })

    const [searched, setSearch] = useState([])

    const getUser = async () => {
        const url = "http://localhost:4000/api/userinfo";
        const { data } = await axios.get(url, config);
        //console.log(data);
        setUserData(data.data);
        // console.log(userHealthData)
    }
  
    useEffect(() => {
    // console.log("called")
    getUser();
    }, []);

    const [err, setErr] = useState("");
    const [success, setSuccess] = useState(false);
    const [errBool, setErrBool] = useState(false);
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);

    const handleCalorieChange = ({ currentTarget: input }) => {
        // console.log("change")
        setMealPlanSettings({...mealPlanSettings, [input.name]: input.value })
    };

    const handleDietChange = (e) => {
        // console.log("change")
        setMealPlanSettings({...mealPlanSettings, diet: e })
    };

    const handleTimeChange = (e) => {
        // console.log("change")
        setMealPlanSettings({...mealPlanSettings, timeFrame: e })
    };

    const config = {
      headers: {
        "auth-token": token
      }
    }

    const handleFormSubmit = async (err) => {
        err.preventDefault();
        try {
            const { data } = await axios.get(`https://api.spoonacular.com/mealplanner/generate?apiKey=${process.env.REACT_APP_API_KEY}&timeFrame=${mealPlanSettings.timeFrame}&targetCalories=${mealPlanSettings.calroieCount}&diet=${mealPlanSettings.diet}`);
            setSearch(data)
            console.log(data.nutrients.calories)
        } catch(e) {
            console.log(e)
        }
    }
    
    return (
        <div className="App">
            <HomeNav />
            <div className="body-wrapper">
                <div className="body-inner">
                    <h3>Generate a Meal Plan That Works for YOU</h3>
                    <form name="mealplan_form" className="mealplan_form" onSubmit={handleFormSubmit}>
                        <div className="settings_div">
                            <div className="setting_element">
                                <label>Time Frame: </label>
                                <Select
                                    onChange={handleTimeChange}
                                    name="timeFrame"
                                    defaultValue={mealPlanSettings.timeFrame}
                                    options={timeFrame_options}
                                    closeMenuOnSelect={true}
                                />
                            </div>

                            <div className="setting_element"> 
                                <label>Target Calories: </label>
                                <input
                                        type="text"
                                        name="calroieCount"
                                        className="form-control"
                                        placeholder="Calorie Count"
                                        defaultValue={mealPlanSettings.calroieCount}
                                        onChange={handleCalorieChange}
                                        required
                                />
                            </div>

                            <div className="setting_element">
                                <label>Diet Type: </label>
                                <Select
                                    onChange={handleDietChange}
                                    name="diet"
                                    defaultValue={mealPlanSettings.diet}
                                    options={diet_options}
                                    closeMenuOnSelect={true}
                                />
                            </div>
                        </div>
                        <div className="submit_div">
                            <button type="submit" className="btn btn-primary">
                                Generate A Meal Plan
                            </button>
                        </div>
                    </form>
                    <div className="mealplan_div">
                        <h3>Meal Plan Nutirtional Info:</h3>
                        <div className="mealplan_nutrional_div">
                            {/* <label>Calories: {Object.keys(searched) }</label> */}
                            {/* <label>Protein: </label>
                            <label>Fat: </label>
                            <label>Carbs: </label> */}
                            {/* <label>{searched}</label> */}
                            {Object.keys(searched).map((key, val) => {
                                return (
                                    <label key={val}>{searched[val]}</label>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
      </div>
    )
};

export default MealPlan;
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Select from 'react-select'
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

    const [searched, setSearch] = useState({
        meals: [],
        nutrients: {}
    })

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
        document.getElementsByClassName("mealplan_div")[0].style.display = "block";
        try {
            const { data } = await axios.get(`https://api.spoonacular.com/mealplanner/generate?apiKey=${process.env.REACT_APP_API_KEY}&timeFrame=${mealPlanSettings.timeFrame}&targetCalories=${mealPlanSettings.calroieCount}&diet=${mealPlanSettings.diet}`);
            
            for (let i = 0; i < data.meals.length; i++) {
                let meal = data.meals[i];
                //console.log(meal.id);
                const recipe = await axios.get(`https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
                //console.log(recipe.data);
                data.meals[i]["image"] = recipe.data.image;
                //console.log(data.meals[i]);
            }
            setSearch(data)
           // console.log(data)
            // console.log(data.nutrients.calories)
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
                        <h3>Meal Plan Nutritional Info:</h3>
                        <div className="mealplan_nutrional_div">
                            {Object.keys(searched.nutrients).map((key, val) => {
                                return (
                                    <label key={val}>{key}: {searched.nutrients[key]}</label>
                                )
                            })}
                        </div>
                        <h3>Meals:</h3>
                        <div className="mealplan_meals_div">
                            <Grid>
                                {Object.keys(searched.meals).map((key, val) => {
                                    return (
                                        <Link to={"/recipe/" + searched.meals[key].id} key={searched.meals[key].id}> 
                                            {/* <li>
                                            <label>{searched.meals[key].image}</label>
                                            </li> */}
                                            <Card>
                                                <img src={searched.meals[key].image} alt="" />
                                                <h4>{searched.meals[key].title}</h4>
                                            </Card>
                                        </Link>
                                    )
                                })}
                            </Grid>
                            
                        </div>
                    </div>
                </div>
            </div>
      </div>
    )
}

const Grid = styled.div`
    display: grid;
    margin-top: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    grid-gap: 3rem;
`;
const Card = styled.div`
    img {
        width: 100%;
        border-radius: 2rem;
    }
    a {
        text-decoration: none;
    }
    h4 {
        padding: 1rem;
        font-size: 1rem;
        text-decoration: none;
    }
`;

export default MealPlan;
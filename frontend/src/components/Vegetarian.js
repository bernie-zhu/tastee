import React, { useState, useEffect } from 'react';
import axios from "axios";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function Vegetarian() {

    const [vegetarian, setVegetarian] = useState([]);

    const getVegetarian = async () => {
        const cachedVegetarian = localStorage.getItem("vegetarian");

        if (cachedVegetarian) {
            setVegetarian(JSON.parse(cachedVegetarian));
        } else {
            const { data } = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&tags="vegetarian,main course"&number=10`);
            //console.log(data);
            localStorage.setItem("vegetarian", JSON.stringify(data.recipes));
            setVegetarian(data.recipes);
        }
    }

    useEffect(() => {
        getVegetarian();
    }, []);

    return (
        <div>
            <Wrapper>
                <h3> Our Vegetarian Picks </h3>
                <Splide options={{
                    perPage: 4,
                    arrows: false,
                    pagination: false,
                    drag: "free",
                    gap: "5rem",
                    breakpoints: {
                        600: {
                            perPage: 1
                        },
                        800: {
                            perPage: 2
                        },
                        1024: {
                            perPage: 3
                        }
                    }
                }}>
                    {vegetarian.map((recipe) => {
                        return (
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <Link to={"/recipe/" + recipe.id}>
                                        <p>{recipe.title}</p>
                                        <img src={recipe.image} alt={recipe.title} />
                                        <Gradient />
                                    </Link>
                                </Card>
                            </SplideSlide>
                        );
                    })}
                </Splide>
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    min-height: 12rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img {
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    p {
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Vegetarian;
import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from 'axios';
import HomeNav from "../../components/HomeNav";

function Searched() {
    let params = useParams();
    const [searched, setSearched] = useState([]);

    const getSearched = async (items) => {
        const { data } = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_KEY}&ingredients=${items}&number=30&limitLicense=true&ranking=1&ignorePantry=false`);
        setSearched(data);
    }

    useEffect(() => {
        getSearched(params.ingredient.replaceAll('+', ","));
    }, [params.ingredient]);
    console.log(searched)
    return (
        <motion.div className="body-wrapper"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <HomeNav />
            <Wrapper>
                <h3> Search results for the ingredients: {params.ingredient.replaceAll('+', ", ")} </h3>
                <Grid>
                    {searched.map((item) => {
                        return (
                            <Link to={"/recipe/" + item.id}  key={item.id}> 
                                <Card>
                                    <img src={item.image} alt="" />
                                    <h4>{item.title}</h4>
                                </Card>
                            </Link>
                        )
                    })}
                </Grid>
            </Wrapper>
        </motion.div>
    );
};

const Wrapper = styled.div`
    margin-top: 5rem;
    h3 {
        margin-bottom: 1rem;
    }
`;
const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    grid-gap: 3rem;
    text-decoration: none;
`;
const Card = styled.div`
    text-decoration: none;
    img {
        width: 100%;
        border-radius: 2rem;
        height: 100%;
        object-fit: cover;
    }
    a {
        text-decoration: none;
    }
    h4 {
        text-align: center;
        padding: 1rem;
        font-size: 1rem;
        text-decoration: none;
    }
`;

export default Searched;
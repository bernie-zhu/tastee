import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import HomeNav from "../../components/HomeNav";
import Cuisines from "../../components/Cuisines";

function Cuisine() {
    let params = useParams();
    const [cuisine, setCuisine] = useState([]);

    const getCuisine = async (name) => {
        const { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=10&cuisine=${name}&sort=random`);
        setCuisine(data.results);
    }

    useEffect(() => {
        getCuisine(params.type);
    }, [params.type])

    return (
        <motion.div className="body-wrapper"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <HomeNav />
            <Cuisines />
            <h3> Our {params.type} Picks </h3>

            <Grid>
                {cuisine.map((item) => {
                    return (
                        <Link to={"/recipe/" + item.id} key={item.id}> 
                            <Card>
                                <img src={item.image} alt="" />
                                <h4>{item.title}</h4>
                            </Card>
                        </Link>
                    )
                })}
            </Grid>
        </motion.div>
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

export default Cuisine
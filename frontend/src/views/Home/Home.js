import React from "react";
import Trending from "../../components/Trending";
import Breakfast from "../../components/Breakfast";
import Beverage from "../../components/Beverage";
import Vegetarian from "../../components/Vegetarian";
import Dessert from "../../components/Dessert";
import Cuisines from "../../components/Cuisines";
import HomeNav from "../../components/HomeNav";
import Ingredients from "../../components/Ingredients";
import { motion } from "framer-motion";
/* eslint-disable */

const Home = () => {
    
    return (
      <motion.div className="App"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HomeNav />
        {/* Whatever stuff you need here */}
        {/* <div className="auth-wrapper">
          <div className="auth-inner"> */}
        <div className="body-wrapper">
          <Ingredients />
          <Cuisines/>
          <Trending />
          <Breakfast />
          <Beverage />
          <Vegetarian />
          <Dessert />
        </div>
        {/* </div>
        </div> */}
        
      </motion.div>
    )
};

export default Home;
import React from "react";
import Login from "../pages/User/Login";
import Signup from "../pages/User/Signup";
import testContext from "./testContext";

const TestState = (props) => {
   let state = {
        name:'Faith',
        age:25
    }
    
    return (
       <testContext.Provider value={state}>
        {/* <Signup/> */}
        {/* <Login/> */}
        {props.children}
       </testContext.Provider>
    )

}

export default TestState;
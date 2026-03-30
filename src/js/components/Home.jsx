import React from "react";
import Todolist from "./Todolist.jsx";

//create your first component
const Home = () => {
    return (
        <div className="text-center mt-5">
            <Todolist />
        </div>
    );
};

export default Home;

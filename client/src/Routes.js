import { BrowserRouter, Route, Routes } from "react-router-dom";


import Home from "../src/pages/home/Home";
import Login from "../src/pages/login/Login";
import Register from "../src/pages/register/Register";
import Example from "../src/pages/example/Example";

function RoutesProvider() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/connexion" element={<Login />} />
                <Route path="/inscription" element={<Register />} />
                <Route path="/exemple" element={<Example />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesProvider;
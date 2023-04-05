import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Example from "./pages/example/Example";
import Game from "./pages/game/GamePlay";
import { NotFound } from "./pages/notfound";

function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Register />} />
        <Route path="/exemple" element={<Example />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<NotFound />} />
        {/* EXAMPLES */}
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesProvider;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./utils/PrivatesRoutes";
import Home from "./pages/Home";
import Game from "./pages/GamePlay";
function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        {/* EXAMPLES */}

        <Route element={<PrivateRoutes />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesProvider;

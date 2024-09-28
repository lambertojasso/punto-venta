import { Routes, Route, BrowserRouter } from "react-router-dom";
import CajaRoutes from "./CajaRoutes";
import Home from "../pages/Home";
import NavBar from "../components/NavBar";

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* ruta al home */}
          <Route path="/" element={<Home />} />
          <Route path="/caja/*" element={<CajaRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;

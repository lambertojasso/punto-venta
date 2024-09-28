import { Routes, Route } from "react-router-dom";
import CajaRegistradora from "../pages/CajaRegistradora";
import ConsultarVenta from "../pages/ConsultarVenta";
import Inventario from "../pages/Inventario";

const CajaRoutes = () => {
  return (
    <Routes>
      <Route path="/punto-venta" element={<CajaRegistradora />} />
      <Route path="/consultar-venta" element={<ConsultarVenta />} />
      <Route path="/inventario" element={<Inventario />} />
    </Routes>
  );
};

export default CajaRoutes;

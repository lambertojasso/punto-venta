import { Routes, Route } from "react-router-dom";
import CajaRegistradora from "../pages/CajaRegistradora";
import ConsultarVenta from "../pages/ConsultarVenta";
import Inventario from "../pages/Inventario";
import Usuarios from "../pages/Usuarios";
import { TiendaProvider } from "../context/TiendaContext";
import BuscarProducto from "../pages/BuscarProducto";
import ConsultaTicket from "../pages/ConsultaTicket";
import { VentasProvider } from "../context/VentasContext";
import VentaDelDia from "../pages/VentaDelDia";

const CajaRoutes = () => {
  return (
    <TiendaProvider>
      <VentasProvider>
        <Routes>
          <Route path="/punto-venta" element={<CajaRegistradora />} />
          <Route path="/buscar-producto" element={<BuscarProducto />} />

          <Route path="/consultar-venta" element={<ConsultarVenta />} />
          <Route
            path="/consultar-ticket/:id_ticket"
            element={<ConsultaTicket />}
          />

          <Route path="/inventario" element={<Inventario />} />
          <Route path="/corte-dia" element={<VentaDelDia />} />

          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </VentasProvider>
    </TiendaProvider>
  );
};

export default CajaRoutes;

import { useNavigate, useParams } from "react-router-dom";
import { useTienda } from "../context/TiendaContext";
import { useEffect } from "react";
import TablaTicketVenta from "../components/TablaTicketVenta";
import TablaPRoductosVentas from "../components/TablaPRoductosVentas";

const ConsultaTicket = () => {
  const { id_ticket } = useParams();
  const navigate = useNavigate();

  const { ventasTicket, ticketVenta } = useTienda();

  useEffect(() => {
    ventasTicket(id_ticket);
  }, []);

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-12">
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Regresar
          </button>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-4">{ticketVenta && <TablaTicketVenta />}</div>
        <div className="col-8 mb-3">{ticketVenta && <TablaPRoductosVentas listaProd={ticketVenta.listaProd} />}</div>
      </div>
    </div>
  );
};

export default ConsultaTicket;

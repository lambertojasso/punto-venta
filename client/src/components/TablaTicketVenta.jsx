import { useTienda } from "../context/TiendaContext";

const TablaTicketVenta = () => {
  const {
    ticketVenta: { infoTicket },
  } = useTienda();

  return (
    <div className="card">
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">No. Ticket</th>
              <th>{infoTicket.idticketVenta}</th>
            </tr>
            <tr>
              <th scope="col">Fecha</th>
              <th>{infoTicket.fecha}</th>
            </tr>

            <tr>
              <th scope="col">Hora</th>
              <th>{infoTicket.hora}</th>
            </tr>
            <tr>
              <th scope="col">No. de articulos</th>
              <th>{infoTicket.totalArticulos} Pz.</th>
            </tr>

            <tr>
              <th scope="col">Total</th>
              <th>$ {infoTicket.totalTicket}</th>
            </tr>

            <tr>
              <th scope="col">Pago</th>
              <th>$ {infoTicket.pago}</th>
            </tr>

            <tr>
              <th scope="col">Cambio</th>
              <th>$ {infoTicket.pago - infoTicket.totalTicket}</th>
            </tr>

            <tr>
              <th scope="col">Cajero</th>
              <th>{infoTicket.usuario}</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default TablaTicketVenta;

import { useEffect } from "react";
import { FormFechas } from "../components/FormFechas";
import { useVentas } from "../context/VentasContext";
import TablaPRoductosVentas from "../components/TablaPRoductosVentas";

const VentaDelDia = () => {
  const { fechas, setFechas, listaDia } = useVentas();

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3>Corte Perido</h3>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <FormFechas fechas={fechas} setFechas={setFechas} />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col">
          <h3>Total en caja: ${listaDia?.total}</h3>
        </div>
      </div>
      <div className="row">
        <div className="col mb-5">
          {listaDia && <TablaPRoductosVentas listaProd={listaDia.lista} />}
        </div>
      </div>
    </div>
  );
};

export default VentaDelDia;

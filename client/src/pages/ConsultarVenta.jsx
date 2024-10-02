import { useEffect } from "react";
import { FormFechas } from "../components/FormFechas";
import { useTienda } from "../context/TiendaContext";
import TablaVentas from "../components/TablaVentas";

const ConsultarVenta = () => {
  const { fechas, ventaPerido, listaVentaPeriodo } = useTienda();

  useEffect(() => {
    ventaPerido();
  }, [fechas]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Consultar venta</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <FormFechas />
        </div>
      </div>
      <div className="row">
        <div className="col">{listaVentaPeriodo && <TablaVentas />}</div>
      </div>
    </div>
  );
};

export default ConsultarVenta;

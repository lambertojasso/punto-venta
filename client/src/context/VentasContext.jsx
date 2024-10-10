import { createContext, useContext, useEffect, useState } from "react";
import { fechaActual } from "../helper/fecha";
import axiosPunto from "../api/axios";

export const VentasContext = createContext();

/* hook para uso de contexro */
export const useVentas = () => {
  const context = useContext(VentasContext);
  if (!context) {
    throw new Error("No existe el contexto");
  }
  return context;
};

export const VentasProvider = ({ children }) => {
  const [listaDia, setListaDia] = useState(null);

  // Fechas para la venta periodo
  const { fecha } = fechaActual();
  const [fechas, setFechas] = useState({
    fechaInicio: fecha,
    fechaFinal: fecha,
  });

  // Funcion fechas especificas

  const ventasPeriodo = async () => {
    try {
      const { data, status } = await axiosPunto.get(
        `/ventas/corte/${fechas.fechaInicio}/${fechas.fechaFinal}`
      );

      if (status !== 200) {
        setListaDia(null);
        return;
      }

      setListaDia({ ...data });
    } catch (error) {
      setListaDia(null);

      console.log(error);
    }
  };

  useEffect(() => {
    ventasPeriodo();
  }, [fechas]);

  const n = 100;

  return (
    <VentasContext.Provider value={{ n, listaDia, fechas, setFechas }}>
      {children}
    </VentasContext.Provider>
  );
};

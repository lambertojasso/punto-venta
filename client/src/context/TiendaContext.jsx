import React, { createContext, useContext, useEffect, useState } from "react";
import axiosPunto from "../api/axios";
import { fechaActual } from "../helper/fecha";

export const TiendaContext = createContext();

/* hook para uso de contexro */
export const useTienda = () => {
  const context = useContext(TiendaContext);
  if (!context) {
    throw new Error("No existe el contexto");
  }
  return context;
};

export const TiendaProvider = ({ children }) => {
  const [producto, setProducto] = useState(null);
  const [lista, setLista] = useState([]);
  const [listaVentaPeriodo, setListaVentaPeriodo] = useState(null);
  const [total, setTotal] = useState(0);
  const [ticketVenta, setTicketVenta] = useState(null);

  // Fechas para la venta periodo
  const { fecha } = fechaActual();
  const [fechas, setFechas] = useState({
    fechaInicio: fecha,
    fechaFinal: fecha,
  });

  // Busca el producto por id
  const buscaProductoId = async (id) => {
    try {
      const { data, status } = await axiosPunto.get(`/producto/${id}`);

      if (status !== 200) {
        setProducto(null);
        return;
      }

      setProducto({ status, data });
    } catch (error) {
      console.log(error);
    }
  };

  // Busca el producto por id
  const buscaProductoNombre = async (nombre) => {
    try {
      const { data, status } = await axiosPunto.get(`/producto/desc/${nombre}`);

      if (status !== 200) return null;

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // Agregar producto a la lista
  const agregarProducto = (cantidad) => {
    let update = false;

    const nuevo = lista.map((el) => {
      if (el.idproductos === producto.data.idproductos) {
        update = true;
        return { ...producto.data, cantidad: el.cantidad + cantidad };
      }
      return el;
    });

    if (update) {
      setLista(nuevo);
    } else {
      setLista([...lista, { ...producto.data, cantidad }]);
    }

    setProducto(null);
  };

  // Elimina producto de la lista
  const eliminaProducto = (id) => {
    // Elimina producto de la lista
    const nuevo = lista.filter((el) => el.idproductos != id);
    // Modifica la lista de venta
    setLista(nuevo);
  };

  // Registrar venta
  const registrarVenta = async (pago) => {
    const reg_venta = {
      pago,
      idUsuario: 1,
      lista,
    };

    try {
      const res = await axiosPunto.post(`/ventas`, reg_venta);

      console.log(res.data.msj);

      // Limpia el ticket
      cancelarVenta();
    } catch (error) {
      console.log(error);
    }
  };

  // Consulta ventas del periodo
  const ventaPerido = async () => {
    try {
      const { data, status } = await axiosPunto.get(
        `/ventas/${fechas.fechaInicio}/${fechas.fechaFinal}`
      );

      if (status !== 200) {
        setListaVentaPeriodo(null);
        return;
      }

      setListaVentaPeriodo({ ...data });
    } catch (error) {
      setListaVentaPeriodo(null);

      console.log(error);
    }
  };

  const ventasTicket = async (ticket) => {

    try {
      const { data, status } = await axiosPunto.get(`/ventas/${ticket}`);

      if (status !== 200) {
        setTicketVenta(null);
        return;
      }

      setTicketVenta({ ...data });
    } catch (error) {
      console.log(error);
    }
  };

  // Cancelar venta
  const cancelarVenta = () => {
    setLista([]);
    setTotal(0);
    setProducto(null);
  };

  // Actualiza el total cada que cambia la lista
  useEffect(() => {
    //Suma las ventas
    const _total = lista.reduce(
      (accumulator, elemento) =>
        accumulator + elemento.precioVenta * elemento.cantidad,
      0
    );
    setTotal(_total);
  }, [lista]);

  return (
    <TiendaContext.Provider
      value={{
        producto,
        setProducto,
        lista,
        setLista,
        buscaProductoId,
        agregarProducto,
        total,
        eliminaProducto,
        registrarVenta,
        cancelarVenta,
        buscaProductoNombre,
        ventaPerido,
        listaVentaPeriodo,
        fechas,
        setFechas,
        ventasTicket,
        ticketVenta,
      }}
    >
      {children}
    </TiendaContext.Provider>
  );
};

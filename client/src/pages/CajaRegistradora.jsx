import React, { useEffect, useState } from "react";
import { useTienda } from "../context/TiendaContext";
import { FormId } from "../components/FormId";
import ListaVenta from "../components/ListaVenta";
import { useNavigate } from "react-router-dom";

const CajaRegistradora = () => {


  const navigate = useNavigate();
  // consumo del contexto
  const {
    producto,
    buscaProductoId,
    agregarProducto,
    total,
    registrarVenta,
  } = useTienda();
  // Variable para almacenar el numero de cuenta
  const [id_Producto, setId_Producto] = useState(null);
  // Variable para la cantidad
  const [cantidad, setCantidad] = useState(null);
  // total

  useEffect(() => {
    if (id_Producto) {
      if (id_Producto > 0) buscaProductoId(id_Producto);
      else {
        if (total <= id_Producto * -1) {
          console.log("Se realiza el cobro cambio: ", id_Producto * -1 - total);

          registrarVenta(id_Producto * -1);
        } else {
          console.log("Pago insuficiente");
        }

        setId_Producto(null);
        setCantidad(null);
      }
    }
  }, [id_Producto]);

  useEffect(() => {
    if (cantidad) {
      if (producto) agregarProducto(cantidad);

      //limpia producto y cantidad
      setId_Producto(null);
      setCantidad(null);
    }
  }, [cantidad]);

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-12">
          <h1>Caja registradora</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <FormId setCantidad={!!!producto ? setId_Producto : setCantidad} />
          <button className="btn btn-primary mt-2" onClick={() => navigate("/caja/buscar-producto")}>Buscar</button>
          {producto && (
            <div>
              <h5 className="mt-3">{producto.data.descripcion}</h5>
              <h2 className="mt-3">$ {producto.data.precioVenta}</h2>
            </div>
          )}
        </div>
        <div className="col-9">
          <ListaVenta />
        </div>
      </div>
    </div>
  );
};

export default CajaRegistradora;

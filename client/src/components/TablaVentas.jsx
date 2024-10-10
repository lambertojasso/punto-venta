import React from "react";
import { useTienda } from "../context/TiendaContext";
import { useNavigate } from "react-router-dom";

const TablaVentas = () => {
  const navigate = useNavigate();
  const { listaVentaPeriodo } = useTienda();
  return (
    <table className="table mt-5">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Fecha</th>
          <th scope="col">Hora</th>
          <th scope="col">Total</th>
          <th scope="col">Opciones</th>
        </tr>
      </thead>
      <tbody>
        {listaVentaPeriodo?.lista.map((el, index) => {
          return (
            <tr key={index}>
              <th scope="row">{el.idticketVenta}</th>
              <td>{el.fecha}</td>
              <td>{el.hora} Pz.</td>
              <td>$ {el.total}</td>
              <td>
                <button
                  className="btn btn-success mx-2"
                  onClick={() => {
                    navigate(`/caja/consultar-ticket/${el.idticketVenta}`);
                  }}
                >
                  Ver ticket
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => console.log("eliminar")}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TablaVentas;

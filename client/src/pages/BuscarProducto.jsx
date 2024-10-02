import React, { useEffect, useState } from "react";
import { Search } from "../components/FormSearch";
import { useNavigate } from "react-router-dom";
import { useTienda } from "../context/TiendaContext";

const BuscarProducto = () => {
  const { buscaProductoNombre, buscaProductoId } = useTienda();

  //   Nombre del producto a buscar
  const [nombrePro, setNombrePro] = useState(null);

  // Resultados de la busqueda
  const [resultados, setResultados] = useState(null);

  // Navega a la pagina anterior
  const navigate = useNavigate();

  const buscar = async () => {
    const res = await buscaProductoNombre(nombrePro.search);
    setResultados(res);
  };

  const seleccionaProducto = (producto) => {
    // Selecciona el producto
    buscaProductoId(producto.idproductos);

    // Limpa los resultados
    setResultados(null);

    //Regresa a la pagina anterios
    navigate(-1);
  };
  useEffect(() => {
    if (nombrePro) buscar();
  }, [nombrePro]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3>Buscar producto por nombre</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <Search setSearch={setNombrePro} />
          <button className="btn btn-danger mt-3" onClick={() => navigate(-1)}>
            Cancelar
          </button>
        </div>
        <div className="col-8">
          {resultados && (
            <div className="text-end">
              {<h5>No. de Resultados {resultados.length}</h5>}
            </div>
          )}
          {resultados?.length > 0 && (
            <ul className="list-group mt-3">
              {resultados.length > 0 &&
                resultados.map((el, index) => (
                  <li
                    className="list-group-item"
                    onClick={() => {
                      seleccionaProducto(el);
                    }}
                    key={index}
                  >
                    {`${index + 1} .- ${el.descripcion}`}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuscarProducto;

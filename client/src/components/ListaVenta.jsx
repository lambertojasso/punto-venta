import { useTienda } from "../context/TiendaContext";

const ListaVenta = () => {
  // utiliza el contexto de tienda
  const { lista, eliminaProducto, total, cancelarVenta } = useTienda();

  return (
    <>
      {lista.length > 0 && (
        <>
          <div className="d-flex justify-content-between">
            <h2>Total: {total}</h2>
            <button className="btn btn-warning" onClick={cancelarVenta}>
              Cancelar
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
                <th scope="col">SubTotal</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((el, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{el.descripcion}</td>
                    <td>{el.cantidad} Pz.</td>
                    <td>$ {el.precioVenta}</td>
                    <td>$ {el.cantidad * el.precioVenta}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => eliminaProducto(el.idproductos)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default ListaVenta;

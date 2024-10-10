const TablaPRoductosVentas = ({ listaProd }) => {
  return (
    <div className="card">
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Precio</th>
              <th scope="col">SubTotal</th>
            </tr>
          </thead>
          <tbody>
            {listaProd.map((el, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{el.descripcion}</td>
                  <td>{el.cantidad} Pz.</td>
                  <td>$ {el.precioVenta}</td>
                  <td>$ {el.subtotal}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaPRoductosVentas;

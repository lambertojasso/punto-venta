//  Funcion para obtener ventas de un periodo
export const consultarVentasPerido = (req, res) => {
  const { fecha_inicio, fecha_final } = req.params;

  res.json({ msj: `ventas fecha: ${(fecha_inicio, fecha_final)}` });
};

// Funcion para consultar ticket de venta #
export const consultarTicket = (req, res) => {
  const { id_ticket } = req.params;

  res.json({ msj: `Producto especifico: ${id_ticket}` });
};

//  Funcion para ingresar una nueva venta
export const registrarVenta = (req, res) => {
  res.json({ msj: `registrar ventas` });
};

// Funcion para eliminar una venta
export const eliminarVenta = (req, res) => {
  const { id_venta } = req.params;

  res.json({ msj: `registrar ventas ${id_venta}` });
};

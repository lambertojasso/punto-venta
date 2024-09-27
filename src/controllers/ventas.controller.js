import { pool } from "../db.js";
import { movimientosInventario } from "./inventario.controller.js";

//  Funcion para obtener ventas de un periodo
export const consultarVentasPerido = async (req, res) => {
  const { fecha_inicio, fecha_final } = req.params;

  console.log(fecha_inicio, fecha_final);
  try {
    // Lista de ventas
    const [listaVentas] = await pool.query(
      `select t.idticketVenta, t.pago, sum(v.cantidad * v.precioVenta) as 'total', t.pago - sum(v.cantidad * v.precioVenta) as 'cambio'
from ticketVenta t 
inner join ventas v on t.idticketVenta = v.idTicket
where date(t.fecha) between ? and ? 
group by v.idTicket
order by date(fecha) asc`,
      [fecha_inicio, fecha_final]
    );

    if (listaVentas.length === 0)
      return res.status(404).json({ msj: `No existen registros` });

    const [total] = await pool.query(
      `select sum(v.cantidad * v.precioVenta) as 'total'
from ticketVenta t 
inner join ventas v on t.idticketVenta = v.idTicket
where date(t.fecha) between ? and ?`,
      [fecha_inicio, fecha_final]
    );

    res.json({
      total: total[0].total,
      listaVentas,
    });
  } catch (error) {
    res.status(500).json({ ...error });
  }
};

//  Funcion para obtener ventas de un periodo
export const consultarVentasProducto = async (req, res) => {
  const { fecha_inicio, fecha_final, idProducto } = req.params;

  try {
    // Lista de inventario
    const [producto] = await pool.query(
      `select * from productos p where p.idproductos = ?`,
      [idProducto]
    );

    if (producto.length === 0)
      return res.status(404).json({ msj: `No existe producto ${idProducto}` });

    // Lista de inventario
    const [listaVentas] = await pool.query(
      `select week(t.fecha,1) as 'semana', sum(v.cantidad) as 'cantidad', v.precioVenta, sum(v.precioVenta * v.cantidad) as 'subtotal' 
from ventas v 
inner join ticketVenta t on t.idticketVenta = v.idTicket 
where v.idProducto = ? and date(t.fecha) between ? and ? 
group by week(t.fecha,1), v.precioVenta`,
      [idProducto, fecha_inicio, fecha_final]
    );

    if (listaVentas.length === 0)
      return res.status(404).json({ msj: `No existe registros de venta` });

    const totalArticulos = listaVentas.reduce(
      (accumulator, elemento) => accumulator + elemento.cantidad,
      0
    );

    const total = listaVentas.reduce(
      (accumulator, elemento) => accumulator + elemento.subtotal,
      0
    );

    res.json({ producto: producto[0], totalArticulos, total, listaVentas });
  } catch (error) {
    res.status(500), json({ ...error });
  }
};

// Funcion para consultar ticket de venta #
export const consultarTicket = async (req, res) => {
  const { id_ticket } = req.params;

  try {
    // informacion del ticket
    const [infoTicket] = await pool.query(
      `select date_format(t.fecha, "%Y-%m-%d") as 'fecha',time(t.fecha) as 'hora', t.pago, u.usuario, t.totalArticulos 
      from ticketVenta t 
inner join usuarios u on u.idusuarios = t.idUsuario
where t.idticketVenta = ?`,
      [id_ticket]
    );

    if (infoTicket.length === 0)
      return res.status(404).json({ msj: `No existen ticket` });

    const [listaProd] = await pool.query(
      `select p.descripcion, v.cantidad, v.precioVenta, (v.cantidad * v.precioVenta) as 'subtotal' 
from ventas v 
inner join productos p on p.idproductos = v.idProducto
where v.idTicket = ?`,
      [id_ticket]
    );

    const totalTicket = listaProd.reduce(
      (accumulator, elemento) => accumulator + elemento.subtotal,
      0
    );

    res.json({ infoTicket: { ...infoTicket[0], totalTicket }, listaProd });
  } catch (error) {
    res.status(500).json({ ...error });
  }
};

//  Funcion para ingresar una nueva venta
export const registrarVenta = async (req, res) => {
  try {
    const { pago = 0, idUsuario = 1, lista = [] } = req.body;

    // Cuenta el numero de articulos

    const totalArticulos = lista.reduce(
      (accumulator, elemento) => accumulator + elemento.cantidad,
      0
    );

    const [nuevoTicket] = await pool.query(
      `insert into ticketVenta (idticketVenta,fecha,totalArticulos,pago,idUsuario) 
      values (0,now(),?,?,?)`,
      [totalArticulos, pago, idUsuario]
    );

    /* Retorna si existe un error */
    if (nuevoTicket.affectedRows === 0)
      return res.status(404).json({ msj: "Error de registrar producto" });

    // Obtiene le id del ticket
    const nticket = nuevoTicket.insertId;

    let q = "";

    // crea el query para insertar los articulos
    lista.forEach((el) => {
      q += `(0, ${nticket}, ${el.idproductos}, ${el.cantidad} , ${el.costo}, ${el.precioVenta}),`;
    });

    // elimina la ultima coma
    q = q.substring(0, q.length - 1);

    // inserta la venta
    const [ventaInsert] = await pool.query(
      `insert into ventas (idventas, idTicket, idProducto, cantidad , costo, precioVenta) 
values ${q}`
    );

    if (ventaInsert.affectedRows != lista.length)
      return res.status(404).json({ msj: "Error de registrar venta" });

    const inventario = lista.map((el) => {
      return {
        id: el.idproductos,
        cantidad: el.cantidad * -1,
      };
    });

    const aInve = await movimientosInventario(inventario);

    if (!aInve)
      return res.status(404).json({ msj: "Error al actualizar inventario" });

    res.json({ msj: `Venta registrada con el ticket ${nticket}` });
  } catch (error) {
    res.status(500).json({ ...error });
  }
};

// Funcion para eliminar una venta
export const eliminarVenta = async (req, res) => {
  const { id_venta } = req.params;

  try {
    // Lista de productos del ticket
    const [prodcutosTicket] = await pool.query(
      `select v.idProducto, v.cantidad from ventas v where v.idTicket = ? order by v.idProducto asc`,
      [id_venta]
    );

    // Actualiza el inventario
    const inventario = prodcutosTicket.map((el) => {
      return {
        id: el.idProducto,
        cantidad: el.cantidad,
      };
    });

    const aInve = await movimientosInventario(inventario);

    if (!aInve)
      // Verifica si se actualizo el inventario
      return res.status(404).json({ msj: "Error al actualizar inventario" });

    // Elimina los productos del ticket
    const [eliminaProd] = await pool.query(
      `delete from ventas v where v.idTicket = ?`,
      [id_venta]
    );

    if (eliminaProd.affectedRows != prodcutosTicket.length)
      return res.status(404).json({ msj: "Error al eliminar producto venta" });

    // Elimina el ticket de la venta
    const [eliminaTicket] = await pool.query(
      `delete from ticketVenta t where t.idticketVenta = ?`,
      [id_venta]
    );

    if (eliminaTicket.affectedRows != 1)
      return res.status(404).json({ msj: "Error al eliminar ticket venta" });

    res.json({ msj: `Venta eliminada !!!` });
  } catch (error) {
    res.status(500).json({ ...error });
  }
};

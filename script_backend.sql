
update productos p set p.descripcion = upper(p.descripcion);

select p.codigo, p.descripcion, inv.cantidad  from inventario inv 
inner join productos p on inv.idProducto = p.idproductos

limit 10;

select p.idproductos, p.codigo, p.descripcion, pr.costo, pr.precioVenta from productos p 
inner join precios pr on pr.idProducto = p.idproductos
where p.idproductos = 2;


select * from productos p where p.descripcion like '%choc%';


select i.cantidad from inventario i where i.idProducto = 7000;



update inventario i set i.cantidad = 0 where i.idProducto = 1;


SELECT FLOOR( 10 + RAND() * ( 10 - 5 + 1 ) ) as n;

select FLOOR(RAND()*(200-20+1)+20);


desc ticketVenta;
-- numero entre 10 y 5
SELECT  help_keyword_id num, concat(FLOOR(RAND()*(2024-2020+1)+2020),"-" ,FLOOR(RAND()*(12-1+1)+1),"-", FLOOR(RAND()*(28-1+1)+1)," ",
FLOOR(RAND()*(23-1+1)+1),":",FLOOR(RAND()*(59-1+1)+1),":",FLOOR(RAND()*(59-1+1)+1)) as fecha
FROM help_keyword_id num
HAVING num BETWEEN 1 AND 100 
ORDER BY 1;


SELECT help_keyword_id num 
FROM mysql.help_keyword 
HAVING num BETWEEN 1 AND 100 
ORDER BY 1;











desc ticketVenta;


desc ventas;
insert into ticketVenta values(0,'2024-7-2',10,10,1);
select * from ticketVenta;
truncate table ticketVenta;

delete from ticketVenta where idticketVenta = 1;
desc ticketVenta;
desc ventas;

update ventas v join ( select p.idProducto as 'id', p.costo as 'costo', p.precioVenta as 'precio'  
  from precios p  ) vals on v.idProducto = vals.id set v.costo = vals.costo, v.precioVenta = vals.precio;
  
  
  select * from ventas limit 10;
  
  
  select v.idTicket as 'id', sum(v.cantidad) as 'total' from ventas v group by v.idTicket limit 10;
  
  
  
  -- 'idticketVenta', 'int', 'NO', 'PRI', NULL, 'auto_increment'

  
  update ticketVenta t join ( select v.idTicket as 'id', sum(v.cantidad) as 'total' from ventas v group by v.idTicket )
  vals on t.idticketVenta = vals.id set t.totalArticulos = vals.total;
  


select * from ticketVenta limit 10;

desc ticketVenta;

  update ticketVenta t join 
  ( select v.idTicket as 'id', sum(v.cantidad * v.precioVenta) as 'total' from ventas v group by v.idTicket )
  vals on t.idticketVenta = vals.id set t.pago = vals.total;
  
  
  
  select v.idTicket as 'id', sum(v.cantidad * v.precioVenta) as 'total' from ventas v group by v.idTicket limit 10;


select * from ventas v where v.idTicket = 60003;


select u.idusuarios, u.usuario, u.tipo from usuarios u;

desc usuarios;

delete from usuarios u where u.idusuarios = 3;



select p.codigo, p.descripcion, i.cantidad from productos p 
inner join inventario i on p.idproductos = i.idProducto
where p.idproductos = 10
limit 10;


-- actualizar inve

desc inventario;

update inventario i set i.cantidad = i.cantidad + 10 where i.idProducto = 1;


update productos p set p.codigo = 'VERHA10', p.descripcion = 'VERGA MAGICA' where p.idProductos = 1;

delete from inventario i where i.idProducto = 1;
delete from precios p where p.idProducto = 1;
delete from productos p where p.idproductos = 1;

insert into productos (idProductos, codigo, descripcion)
values (0,'5858','JABON ZOTE');


select * from usuarios;

insert into usuarios (idusuarios, usuario, password, tipo) values (0,'tavo','123','admin');






update usuarios u set u.usuario = "casa", u.password = "123", u.tipo = "caja" where u.idusuarios = 5;



-- Venta de productos

select t.idticketVenta, t.pago, sum(v.cantidad * v.precioVenta) as 'total', t.pago - sum(v.cantidad * v.precioVenta) as 'cambio'
from ticketVenta t 
inner join ventas v on t.idticketVenta = v.idTicket
where date(t.fecha) between '2024-01-01' and '2024-01-31'
group by v.idTicket
order by date(fecha) asc;

select sum(v.cantidad * v.precioVenta) as 'total'
from ticketVenta t 
inner join ventas v on t.idticketVenta = v.idTicket
where date(t.fecha) between '2024-01-01' and '2024-01-31';


-- Actualiza pago de ticket venta
-- update ticketVenta t set t.pago = t.pago + FLOOR(RAND()*(200-20+1)+20);


select t.fecha, t.pago, u.usuario, t.totalArticulos from ticketVenta t 
inner join usuarios u on u.idusuarios = t.idUsuario
where t.idticketVenta = 60523;

select p.descripcion, v.cantidad, v.precioVenta, (v.cantidad * v.precioVenta) as 'subtotal' 
from ventas v 
inner join productos p on p.idproductos = v.idProducto
where v.idTicket = 60523;

select sum(v.cantidad * v.precioVenta) as 'total' from ventas v where v.idTicket = 60523;


select week(t.fecha,1) as 'semana', sum(v.cantidad) as 'cantidad', v.precioVenta, sum(v.precioVenta * v.cantidad) as 'subTotal' 
from ventas v 
inner join ticketVenta t on t.idticketVenta = v.idTicket 
where v.idProducto = 2 and date(t.fecha) between '2024-01-01' and '2024-12-31'
group by week(t.fecha,1), v.precioVenta;

desc ticketVenta ;

-- 'idticketVenta', 'int', 'NO', 'PRI', NULL, 'auto_increment'
-- 'fecha', 'datetime', 'NO', '', NULL, ''
-- 'totalArticulos', 'int', 'NO', '', '0', ''
-- 'pago', 'float', 'NO', '', '0', ''
-- 'idUsuario', 'int', 'NO', 'MUL', NULL, ''
select now();
insert into ticketVenta (idticketVenta,fecha,totalArticulos,pago,idUsuario) 
values (0,now(),0,0,1);

-- registyrar venta

desc ventas;

# Field, Type, Null, Key, Default, Extra
-- idventas, int, NO, PRI, , auto_increment
-- idTicket, int, NO, MUL, , 
-- idProducto, int, NO, MUL, , 
-- cantidad, float, YES, , , 
-- costo, float, YES, , , 
-- precioVenta, float, YES, , , 

insert into ventas (idventas, idTicket, idProducto, cantidad , costo, precioVenta) 
values (idventas, idTicket, idProducto, cantidad , costo, precioVenta); 

update inventario i set i.cantidad = i.cantidad + (-1) where i.idProducto = 1;

;

select * from inventario limit 5;

desc inventario;
desc ventas;

UPDATE inventario SET cantidad = CASE idProducto 
                          WHEN 1 THEN cantidad + -1 
                          WHEN 2 THEN cantidad + 2 
                          WHEN 3 THEN cantidad + 10                            
                        END
             WHERE idProducto IN (1, 2, 3);
             
             



select v.idProducto, v.cantidad from ventas v where v.idTicket = 65235 order by v.idProducto asc;

delete from ventas v where v.idTicket = 90003;

 delete from ticketVenta t where t.idticketVenta = 90003;
 
 
 select * from usuarios;
 
 -- Ventas del dia
 select date(now());
 
 
 select t.idticketVenta from ticketVenta t 
 
 where date(t.fecha) = date(now());
 
 
 select p.idproductos, p.descripcion, sum(v.cantidad) from ventas v 
 inner join productos p on v.idProducto = p.idproductos 
 where v.idTicket in ( select t.idticketVenta from ticketVenta t where date(t.fecha) = date(now()));
 
 
 
 
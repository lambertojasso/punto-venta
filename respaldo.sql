-- Base de datos local
-- Borra la base de datos si existe
DROP DATABASE IF EXISTS  puntoVenta;

-- Crea una nueva base de datos 
CREATE DATABASE puntoVenta;

-- selecciona la base de datos nueva
use puntoVenta;

-- llena los datos de la base de datos local
SOURCE /home/gustavo/punto-venta/base2.sql

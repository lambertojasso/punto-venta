// Fecha actual del sistema
export const fechaActual = () => {
    const date = new Date();
    const hoy = {
      anio: date.getFullYear(),
      mes: date.getMonth() + 1,
      dia: date.getDate(),
      hora: date.getHours(),
      minutos: date.getMinutes(),
      segundos: date.getSeconds(),
    };
  
    // Correccion de la fecha
    if (hoy.mes < 10) hoy.mes = `0${hoy.mes}`;
    if (hoy.dia < 10) hoy.dia = `0${hoy.dia}`;
  
    // Correccion de la hora
    if (hoy.hora < 10) hoy.hora = `0${hoy.hora}`;
    if (hoy.minutos < 10) hoy.minutos = `0${hoy.minutos}`;
    if (hoy.segundos < 10) hoy.segundos = `0${hoy.segundos}`;
  
    return {
      fecha: `${hoy.anio}-${hoy.mes}-${hoy.dia}`,
      hora: `${hoy.hora}:${hoy.minutos}:${hoy.segundos}`,
      hora2: `${hoy.hora}:${hoy.minutos}`,
    };
  };
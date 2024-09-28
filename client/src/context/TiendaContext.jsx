import React, { createContext, useContext, useEffect, useState } from "react";

export const TiendaContext = createContext();

/* hook para uso de contexro */
export const useTienda = () => {
  const context = useContext(TiendaContext);
  if (!context) {
    throw new Error("No existe el contexto");
  }
  return context;
};

export const TiendaProvider = ({ children }) => {
  const [depto, setDepto] = useState(null);

  const listaDepto = async () => {
    try {
      const res = await deptoRequest();

      setDepto(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listaDepto();
  }, []);

  return (
    <TiendaContext.Provider
      value={{
        depto,
      }}
    >
      {children}
    </TiendaContext.Provider>
  );
};

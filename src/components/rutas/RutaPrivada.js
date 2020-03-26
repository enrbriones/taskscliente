import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/autenticacion/authContext';

const RutaPrivada = ({ component: Component, ...props }) => {
  const authCtx = useContext(authContext);
  const { autenticado, cargando, usuarioAutenticado } = authCtx;

  useEffect(() => {
    usuarioAutenticado()
  }, [])

  return (
    <Route
      {...props}
      render={props =>
        // !autenticado && !cargando ? <Redirect to='/' /> : <Component {...props} />
        autenticado || cargando ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  );
};

export default RutaPrivada;

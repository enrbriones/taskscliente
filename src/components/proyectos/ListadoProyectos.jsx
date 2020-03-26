import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import alertaContext from '../../context/alertas/alertaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoProyectos = () => {
  const proyectosContext = useContext(proyectoContext);
  const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

  const alertaCtx = useContext(alertaContext);
  const { alerta, mostrarAlerta } = alertaCtx;

  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerProyectos();
  }, [mensaje]);

  if (proyectos.length === 0)
    return <p>No hay proyectos, comienza creando uno!</p>;

  return (
    <div>
      <ul className='listado-proyectos'>
        {alerta ? (
          <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
        ) : null}
        <TransitionGroup>
          {proyectos.map(proyecto => (
            <CSSTransition
              key={proyecto._id}
              timeout={200}
              classNames='proyecto'
            >
              <Proyecto proyecto={proyecto} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
    </div>
  );
};

export default ListadoProyectos;

import React, {useContext,useEffect} from 'react';
import authContext from '../../context/autenticacion/authContext'
import TareaContext from '../../context/tareas/TareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Barra = () => {
  
  const authCxt = useContext(authContext)
  const {usuario,usuarioAutenticado,cerrarSesion }= authCxt

  const tareasContext = useContext(TareaContext);
  const { limpiarTareas } = tareasContext;

  const proyectoCtx = useContext(proyectoContext)
  const {resetProyecto} = proyectoCtx

  useEffect(() => {
    usuarioAutenticado()
  }, [])

  const clickCerrarSesion = ()=>{
    limpiarTareas()
    resetProyecto()
    cerrarSesion()
  }

    return (
      <header className='app-header'>
        {usuario? <p className='nombre-usuario'>Hola <span>{usuario.nombre}</span></p>:null}
          <nav className='nav-principal'>
            <button className='btn btn-blank cerrar-sesion' onClick={clickCerrarSesion}>Cerrar Sesión</button>
          </nav>
      </header>
    );
};

export default Barra;
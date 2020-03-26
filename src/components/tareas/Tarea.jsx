import React, {useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

const Tarea = ({ tarea }) => {

  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;
  const [proyectoActual]=proyecto

  const tareasContext = useContext(TareaContext)
  const {obtenerTareas, eliminarTarea, actualizarTarea, guardarTareaActual} = tareasContext

  const clickEliminar = id =>{
    eliminarTarea(id,proyectoActual._id)
    obtenerTareas(proyectoActual.id)
  }

  const cambiarEstado = tarea=>{
    tarea.estado= !tarea.estado
    actualizarTarea(tarea)
  }

  const seleccionarTarea= tarea =>{
    guardarTareaActual(tarea)
  }

  return (
    <li className='tarea sombra'>
      <p>{tarea.nombre}</p>
      <div className='estado'>
        {/* {tarea.estado ? (
          <button type='button' className='completo' onClick={()=>cambiarEstado(tarea)}>
            Completo
          </button>
        ) : (
          <button type='button' className='incompleto' onClick={()=>cambiarEstado(tarea)}>
            Incompleto
          </button>
        )} */}
      <button type='button' className={tarea.estado?"completo":"incompleto"} onClick={()=>cambiarEstado(tarea)}>
            {tarea.estado?"(Completo)":"(Incompleto)"}
          </button>

      </div>
      <div className="acciones">
          <button type='button' className='btn btn-primario' onClick={()=>seleccionarTarea(tarea)}>Editar</button>
          <button type='button' className='btn btn-secundario' onClick={()=>clickEliminar(tarea._id)}>Eliminar</button>
      </div>
    </li>
  );
};

export default Tarea;

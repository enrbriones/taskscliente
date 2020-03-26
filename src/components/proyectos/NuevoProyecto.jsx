import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {
  const proyectosContext = useContext(proyectoContext);
  const { formulario, errorFormulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

  const [proyecto, setProyecto] = useState({
    nombre: ''
  });

  const { nombre } = proyecto;

  const handleChange = e => {
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if(nombre===''){
      mostrarError()
      return null
    }
    agregarProyecto(proyecto)
    setProyecto({
      nombre:''
    })
  };

  return (
    <Fragment>
      <button type='button' className='btn btn-block btn-primario' onClick={mostrarFormulario}>
        Nuevo Proyecto
      </button>
      {formulario ? (
        <form className='formulario-nuevo-proyecto' onSubmit={handleSubmit}>
          <input
            type='text'
            className='input-text'
            placeholder='Nombre Proyecto'
            name='nombre'
            value={nombre}
            onChange={handleChange}
          />
          <input
            type='submit'
            className='btn btn-primario btn-block'
            value='Agregar Proyecto'
          />
        </form>
      ) : null}

      {errorFormulario?<p className='mensaje error'>El nombre del Proyecto es obligatorio</p> :null}
    </Fragment>
  );
};

export default NuevoProyecto;

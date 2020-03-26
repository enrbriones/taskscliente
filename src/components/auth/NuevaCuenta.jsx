import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Alertacontext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const NuevaCuenta = (props) => {

  const alertaContext = useContext(Alertacontext)
  const {alerta, mostrarAlerta} = alertaContext

  const authContext = useContext(AuthContext)
  const {mensaje,autenticado,registrarUsuario}= authContext

  useEffect(() => {
    if(autenticado){
      props.history.push('/proyectos')
    }

    if(mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria)
    }
 
  }, [mensaje, autenticado, props.history ])


  const [usuario, setUsuario] = useState({
        nombre:'',
        email: '',
        password: '',
        confirmar:''
  });

  const {nombre,email, password, confirmar}=usuario;
  
  const handleChange = (e) => {
      setUsuario({
          ...usuario,
          [e.target.name]:e.target.value
      })
  };

  const handleSubmit = e =>{
      e.preventDefault()
      if(nombre.trim()==='' ||email.trim()==='' ||password.trim()==='' ||confirmar.trim()==='' ){
        mostrarAlerta('Todos los campos son obligatorios','alerta-error')
        return
      }
      if(password.length<6){
        mostrarAlerta('El password debe ser de al menos 6 caracteres','alerta-error')
        return
      }

      if(password!==confirmar){
        mostrarAlerta('los passwords no son iguales','alerta-error')
        return
      }

      registrarUsuario({
        nombre,
        email,
        password
      })
  }

  return (
    <div className='form-usuario'>
      {alerta? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>):null}
      <div className='contenedor-form sombra-dark'>
        <h1>Obtener una cuenta</h1>
        <form onSubmit={handleSubmit}>

        <div className='campo-form'>
            <label htmlFor='nombre'>Nombre</label>
            <input
              type='text'
              id='nombre'
              name='nombre'
              className=''
              placeholder='Tu Nombre'
              value={nombre}
              onChange={handleChange}
            />
          </div>

          <div className='campo-form'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              className=''
              placeholder='Tu Email'
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className='campo-form'>
            <label htmlFor='email'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              className=''
              placeholder='Tu Password'
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className='campo-form'>
            <label htmlFor='confirmar'>Confirmar Password</label>
            <input
              type='password'
              id='confirmar'
              name='confirmar'
              className=''
              placeholder='Repite tu Password'
              value={confirmar}
              onChange={handleChange}
            />
          </div>

          <div className='campo-form'>
            <input
              type='submit'
              className='btn btn-primario btn-block'
              value='Registrarme'
            />
          </div>
        </form>
        <Link to={'/'} className='enlace-cuenta'>
            Volver a Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;

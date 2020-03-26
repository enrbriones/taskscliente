import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Alertacontext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const Login = (props) => {

  const alertaContext = useContext(Alertacontext)
  const {alerta, mostrarAlerta} = alertaContext

  const authContext = useContext(AuthContext)
  const {mensaje,autenticado,iniciarSesion}= authContext

  useEffect(() => {
    if(autenticado){
      props.history.push('/proyectos')
    }

    if(mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria)
    }
 
  }, [mensaje, autenticado, props.history ])

  const [usuario, setUsuario] = useState({
    email: '',
    password: ''
  });

  const {email, password}=usuario;
  

  const handleChange = (e) => {
      setUsuario({
          ...usuario,
          [e.target.name]:e.target.value
      })
  };

  const handleSubmit = e =>{
      e.preventDefault()
    if(email.trim()===''|| password.trim()===''){
      mostrarAlerta('Todos los campos son requeridos','alerta-error')
    }
    iniciarSesion({email, password})
  }

  return (
    <div className='form-usuario'>
            {alerta? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>):null}
      <div className='contenedor-form sombra-dark'>
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
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
            <label htmlFor='email'>password</label>
            <input
              type='password'
              id='password'
              name='password'
              className=''
              placeholder='Tu password'
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className='campo-form'>
            <input
              type='submit'
              className='btn btn-primario btn-block'
              value='Iniciar Sesión'
            />
          </div>
        </form>
        <Link to={'/nueva-cuenta'} className='enlace-cuenta'>
            Obtener Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;

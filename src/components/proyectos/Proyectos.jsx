import React, {useContext, useEffect, Fragment} from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTarea from '../tareas/FormTarea'
import ListadoTareas from '../tareas/ListadoTareas';
import authContext from '../../context/autenticacion/authContext'

const Proyectos = () => {

    const authCxt = useContext(authContext)
    const {autenticado,usuarioAutenticado}= authCxt

    useEffect(() => {
        usuarioAutenticado()
    }, [])

    return (
        <Fragment>
            {autenticado?(
        <div className='contenedor-app'>
                <Sidebar/>
            <div className="seccion-principal">
                <Barra/>
                <main>
                   <FormTarea/>
                <div className="contenedor-tareas">
                    <ListadoTareas/>
                </div>
                </main>
            </div>
        </div>
        ):null}
        </Fragment>
    );
};

export default Proyectos;
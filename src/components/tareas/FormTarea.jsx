import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareasContext = useContext(TareaContext)
    const {tareaseleccionada, errortarea,agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea} = tareasContext

    const [tarea, setTarea] = useState({
        nombre:'',
        estado:false
    })
    const {nombre}= tarea;

    useEffect(() => {
        if(tareaseleccionada!==null){
            setTarea(tareaseleccionada)
        }else{
            setTarea({
                nombre:''
            })
        }
    }, [tareaseleccionada])


    if(!proyecto) return null
    const [proyectoActual] = proyecto

    const handleChange = e =>{
        setTarea({
            ...tarea,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(nombre.trim()===''){
            validarTarea()
            return
        }

        if(tareaseleccionada===null){
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea)
        }else{
            actualizarTarea(tarea)
            limpiarTarea()
        }
        obtenerTareas(proyectoActual.id)
        setTarea({
            nombre:'',
            estado:false
        })

    }

    return (
        <div className='formulario'>
            <form onSubmit={handleSubmit}>
                <div className='contenedor-input'>
                    <input type='text' className='input-text' placeholder='Nombre Tarea...' name='nombre' value={nombre} onChange={handleChange}/>
                </div>
                <div className='contenedor-input'>
                    <input type='submit' className='btn btn-primario btn-submit btn-block' value={tareaseleccionada?'Editar Tarea':'Agregar Tarea'} />
                </div>
            </form>
            {errortarea?<p className='mensaje error'>El nombre de la tarea es obligatorio</p>:null}
        </div>
    );
};

export default FormTarea;
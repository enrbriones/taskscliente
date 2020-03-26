import React, { useReducer } from 'react';
import TareaContext from './TareaContext';
import TareaReducer from './TareaReducer';
import clienteAxios from '../../config/axios';
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
  LIMPIAR_TAREAS
} from '../../types/index';

const TareaState = props => {
  const initialState = {
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null
  };

  const [state, dispatch] = useReducer(TareaReducer, initialState);

  // Obtener las tareas de un proyecto

  const obtenerTareas = async proyecto => {
    try {
      const resultado = await clienteAxios.get('/api/tareas', {
        params: { proyecto }
      });
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas
      });
    } catch (error) {
      console.log(error);
    }
  };

  const agregarTarea = async tarea => {
    try {
      const resultado = await clienteAxios.post('/api/tareas', tarea);
      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea
      });
    } catch (error) {
      console.log(error);
    }
  };

  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA
    });
  };

  const eliminarTarea = async (tareaId, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${tareaId}`, {
        params: { proyecto }
      });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: tareaId
      });
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarTarea = async tarea => {
    try {
      const resultado = await clienteAxios.put(
        `/api/tareas/${tarea._id}`,
        tarea
      );
      console.log(resultado);
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tarea
      });
    } catch (error) {
      console.log(error);
    }
  };

  const guardarTareaActual = tarea => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea
    });
  };

  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA
    });
  };

  //Limpia todas las tareas
  const limpiarTareas = () => {
    dispatch({
      type: LIMPIAR_TAREAS
    });
  };

  ////////////////////////

  return (
    <TareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea,
        limpiarTareas
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;

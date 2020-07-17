import React, {Fragment, useState} from "react";
import uuid from "uuid/dist/v4";

const Formulario = ({crearCita}) => {

    // Crear state de citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })

    const [error, actualizarError] = useState(false)

    // Evento actualizar state
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    // Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita

    // Evento enviar formulario
    const submitCita = e => {
        e.preventDefault()
        actualizarError(false)

        // Validar
        if (mascota.trim() === ''
            || propietario.trim() === ''
            || fecha.trim() === ''
            || hora.trim() === ''
            || sintomas.trim() === '') {
            actualizarError(true)
            return
        }

        // Asignar un ID
        cita.id = uuid()

        // Crear la cita
        crearCita(cita)

        // Limpiar el formulario
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return (
        <Fragment>
            <h2>Crear Cita</h2>

            { error ? <h6>Todos los campos son obligatorios</h6> : null }

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre del Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                />

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
    )
}

export default Formulario;

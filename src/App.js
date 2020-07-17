import React, {Fragment, useEffect, useState} from 'react';
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {

    // Citas en localstorage
    let citasIniciales = JSON.parse(localStorage.getItem('citas'))
    if (!citasIniciales) citasIniciales = []

    // Arreglo de citas
    const [citas, guardarCitas] = useState(citasIniciales);

    useEffect( () => {
        if (citasIniciales) {
            localStorage.setItem('citas', JSON.stringify(citas))
        } else {
            localStorage.setItem('citas', JSON.stringify([]))
        }
    }, [citas, citasIniciales])

    // arregar citas
    const crearCita = cita => {
        guardarCitas([
            ...citas,
            cita
        ])
    }

    // Función para eliminar las citas
    const eliminarCita = id => {
        const nuevasCitas = citas.filter(cita => cita.id !== id)
        guardarCitas(nuevasCitas)
    }

    return (
     <Fragment>
        <h1>Administrador de Pacientes</h1>

        <div className="container">
          <div className="row">
            <div className="one-half column">
                <Formulario
                    crearCita={crearCita}
                />
            </div>
            <div className="one-half column">
                <h2>Administra tus citas</h2>
                {citas.map(cita => (
                    <Cita
                        key={cita.id}
                        cita={cita}
                        eliminarCita={eliminarCita}
                    />
                ))}
            </div>
          </div>
        </div>
      </Fragment>
  );
}

export default App;

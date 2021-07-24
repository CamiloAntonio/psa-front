import React, { useState } from 'react'
import {Input, Button, Table, ButtonGroup} from 'reactstrap'

export default function HoursEdit() {
    const [horas, setHoras] = useState([]);

    return (
        <div className="content">
            <h1>Edición de Horas</h1>
            <h3>Proyecto PSA - Tarea Programar Front End</h3>
            <div>Ingrese la cantidad de horas trabajadas</div>
            <Input placeHolder="Horas" type="number" min={0} max={24}></Input>        
            <Button color="secondary" size="sm">Cancelar</Button>
            <Button color="primary" size="sm" disabled>Guardar</Button>
            <hr color="#4c4c4c"></hr>
        </div>
    )
}
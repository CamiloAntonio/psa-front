import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import {Input, Button, FormGroup, Label} from 'reactstrap'
import HoursService from "services/soporte/hour.service";

export default function HoursCreate() {
    const [hour, setHour] = useState({
        "id": 0,
        "quantity": 0,
        "date": "2021-07-26T05:31:11.453+00:00",
        "responsibleResourceID": 1 // Hardcodeado a 1 por ahora
    });

    let taskID = useParams().id;

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    const handleSubmit = e => {
        e.preventDefault();
        HoursService.createHours(hour);
        goToPreviousPath();
    }

    const handleChange = e => {
        var {name, value} = e.target;
    
        if (name == "quantity") {
            value = Number(value);
        }

        setHour({
            ...hour,
            [name] : value
        });
    };

    return (
        <div className="content">
            <h1>Carga de Horas</h1>
            <h3>Tarea {taskID}</h3>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Ingrese la cantidad de horas trabajadas</Label>
                    <Input name="quantity" placeHolder="Horas" type="number" min={1} max={24} onChange={handleChange} value={hour.quantity} required></Input>   
                </FormGroup>  
                
                <div className="text-right">  
                    <Button color="secondary" size="sm" onClick={goToPreviousPath}>Cancelar</Button>
                    <Button color="primary" type="submit" size="sm">Cargar horas</Button> 
                </div>
            </form>

        </div>
    )
}
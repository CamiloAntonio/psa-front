import React, { useState, useEffect } from 'react'
import {Input, Button, Label, FormGroup} from 'reactstrap'
import { useParams, useHistory } from 'react-router-dom';
import HoursService from "services/soporte/hour.service";

export default function HoursEdit() {
    const hourID = useParams().id;
    const [hour, setHour] = useState([]);

    // Go to previous page
    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    // Attempt to submit to servers
    const handleSubmit = e => {
        e.preventDefault();
        HoursService.updateHours(hour);
        goToPreviousPath();
    }

    // Update input
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

    // Actualizar hora a editar
    function updateHour(data) {
        data.forEach(h => {
            if (h.id == hourID) {
                setHour(h);
            }
        });
    }

    // Cargar horas
    useEffect(() => {
        HoursService.getHours(function(data) {
            updateHour(data);
        })
    }, []);

    return (
        <div className="content">
            <h1>Edición de Horas</h1>
            <h3>Tarea {hourID}</h3>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Ingrese la cantidad de horas trabajadas</Label>
                    <Input name="quantity" placeHolder="Horas" type="number" min={1} max={24} onChange={handleChange} value={hour.quantity} required></Input>   
                </FormGroup>    
                
                <div className="text-right">
                    <Button color="secondary" size="sm" onClick={goToPreviousPath}>Cancelar</Button>
                    <Button color="primary" type="submit" size="sm">Guardar cambios</Button> 
                </div>
            </form>

        </div>
    )
}
import React, { useState, useEffect } from 'react'
import {Input, Button, Label, FormGroup} from 'reactstrap'
import { useParams, useHistory } from 'react-router-dom';
import HoursService from "services/soporte/hour.service";
import ProjectService from "services/project.service"
import DatePicker from "react-date-picker";

export default function HoursEdit() {
    
    const [taskName, setTaskName] = useState(["Nombre Tarea"])

    const hourID = useParams().id;
    const [hour, setHour] = useState({
        "id": 0,
        "quantity": 0,
        "date": (new Date()).toISOString(),
        "responsibleResourceID": 1,
        "taskId": 0
    })

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

    useEffect(() => {
        ProjectService.getTaskById(hour.taskId)
            .then(res => res.json())
            .then(function(response) {
            setTaskName(response.nombre);
        })
    }, [hour.taskId])

    const handleDateChange = e => {
        var value = e
        setHour({
            ...hour,
            "date" : value.toISOString()
        })
    }

    // Credits to: https://stackoverflow.com/questions/27012854/how-to-change-iso-date-string-to-date-object
    function parseISOString(s) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    }

    return (
        <div className="content">
            <h1>Edición de Horas</h1>
            <h3>Tarea {taskName} [{hour.taskId}]</h3>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Ingrese la cantidad de horas trabajadas</Label>
                    <Input name="quantity" placeHolder="Horas" type="number" min={1} max={24} onChange={handleChange} value={hour.quantity} required></Input>   
                    <Label>Ingrese la fecha en que se trabajaron las horas:</Label>
                    <br></br>
                    <DatePicker 
                        name="date"
                        clearIcon={null}
                        calendarIcon={
                            <i className="far fa-calendar"></i>
                        }
                        value={parseISOString(hour.date)}
                        maxDate={new Date()}
                        onChange={handleDateChange}
                        required>
                    </DatePicker>  
                </FormGroup>    
                
                <div className="text-right">
                    <Button color="secondary" size="sm" onClick={goToPreviousPath}>Cancelar</Button>
                    <Button color="info" type="submit" size="sm">Guardar cambios</Button> 
                </div>
            </form>
        </div>
    )
}
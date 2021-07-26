import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import {Input, Button, FormGroup, Label} from 'reactstrap'
import HoursService from "services/soporte/hour.service";
import DatePicker from "react-date-picker";

export default function HoursCreate() {
    const [hour, setHour] = useState({
        "id": 0,
        "quantity": 0,
        "date": (new Date()).toISOString(),
        "responsibleResourceID": 1 // Hardcodeado a 1 por ahora
    });
    const [isOpen, setIsOpen] = useState(false);

    console.log(new Date())
    console.log(new Date().toISOString())
    console.log(parseISOString(new Date().toISOString()))


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
            <h1>Carga de Horas</h1>
            <h3>Tarea {taskID}</h3>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Ingrese la cantidad de horas trabajadas:</Label>
                    <Input 
                        name="quantity"
                        placeHolder="Horas"
                        type="number" 
                        min={1} 
                        max={24} 
                        onChange={handleChange} 
                        value={hour.quantity}
                        required>
                    </Input>   
                    <Label>Ingrese la fecha en que se trabajaron las horas:</Label>
                    <br></br>
                    <DatePicker 
                        name="date"
                        clearIcon={null}
                        calendarIcon={
                            <i class="far fa-calendar"></i>
                        }
                        value={parseISOString(hour.date)}
                        maxDate={new Date()}
                        onChange={handleDateChange}
                        required>
                    </DatePicker>  
                </FormGroup>
                
                <div className="text-right">  
                    <Button color="secondary" size="sm" onClick={goToPreviousPath}>Cancelar</Button>
                    <Button color="primary" type="submit" size="sm">Cargar horas</Button> 
                </div>
            </form>

        </div>
    )
}
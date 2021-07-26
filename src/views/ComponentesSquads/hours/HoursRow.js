import React, {useState, useEffect} from 'react'
import {Button} from 'reactstrap'
import {Link} from "react-router-dom";
import HoursService from "services/soporte/hour.service";
import ProjectService from "services/project.service"

export default function HoursRow({id, responsibleName, quantity, date, taskId}) {
    const [taskName, setTaskName] = useState(["Nombre Tarea"])

    function deleteHours(id) {
        HoursService.deleteHours(id);
        window.location.reload();
    }

    // Credits to: https://stackoverflow.com/questions/27012854/how-to-change-iso-date-string-to-date-object
    function parseISOString(s) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    }

    useEffect(() => {
        ProjectService.getTaskById(taskId)
            .then(res => res.json())
            .then(function(response) {
            setTaskName(response.nombre);
        })
    }, [])

    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{responsibleName}</td>
            <td>{taskName} [{taskId}]</td>
            <td>{quantity}</td>
            <td>{parseISOString(date).toLocaleDateString("en-US")}</td>
            <td className="text-right">
                                <Button 
                                    color="danger" 
                                    size="sm" 
                                    onClick={() => {
                                            if (window.confirm(
                                                `¿Estás seguro que querés borrar las horas con ID ${id}?` +
                                                "\n¡Esta acción no se podrá deshacer!")) {
                                            deleteHours(id); 
                                            }
                                        } 
                                    }>
                                    Eliminar
                                </Button>
                                {' '}
                                <Link to={`edit/${id}/`}><Button className="btn-icon" color="info" size="sm">
                        <i className="fa fa-edit"/>
                    </Button></Link>
            </td>
        </tr>
    )
}

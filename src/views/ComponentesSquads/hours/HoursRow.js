import React from 'react'
import {Button, ButtonGroup} from 'reactstrap'
import {Link} from "react-router-dom";

const API_URL = "https://psa-hours-module.herokuapp.com/hour/"

export default function HoursRow({id, responsibleName, quantity, date}) {
    function deleteHours(id) {
        fetch(
            API_URL + id, 
            {   method: "delete",
                body: id
            }
        ).then(function(response) {
                if (response.status !== 200) {
                    console.log("Error borrando las horas del lado del servidor");
                    return;
                }

                window.location.reload();
            }
        ).catch(function(err) {
            console.log("Error de Fetch");
        });


        console.log(id);
    }

    // Credits to: https://stackoverflow.com/questions/27012854/how-to-change-iso-date-string-to-date-object
    function parseISOString(s) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    }

    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{responsibleName}</td>
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

//function() {deleteHours(id)}
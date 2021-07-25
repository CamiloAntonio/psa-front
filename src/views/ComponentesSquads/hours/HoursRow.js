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


    function modifyHours(id) {
        console.log(id);
    }

    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{responsibleName}</td>
            <td>{quantity}</td>
            <td>{date.split("T")[0]}</td>
            <td className="text-right">
                            <ButtonGroup>
                                <Button color="secondary" size="sm" onClick={function() {deleteHours(id)}}>Eliminar</Button>
                                <Link to={`edit/${id}/`}><Button color="secondary" size="sm">Modificar</Button></Link>
                            </ButtonGroup>
            </td>
            <Link to={"/admin/hours/create"}>Link</Link>
        </tr>
    )
}
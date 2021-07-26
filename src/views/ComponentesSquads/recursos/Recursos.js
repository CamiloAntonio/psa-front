import React, { useState, useEffect } from 'react'
import {Table} from 'reactstrap'
import RecursosRow from './RecursosRow'


export default function Recursos() {
    const [resources, setResources] = useState([]);

    function updateResources(data) {  
        setResources(_ => {
            return data;
        });
    }

    useEffect(() => {
        fetch("https://psa-resources-module.herokuapp.com/resource").then(
            function(response) {
                if (response.status !== 200) {
                    console.log("Error obteniendo los recursos");
                    return;
                }
    
                response.json().then(function(data) {
                    updateResources(data);                    
                })
            }
        )
        .catch(function(err) {
            console.log("Error de Fetch");
        });
    }, []);

    return (
        <div className="content">
            <h1>Recursos</h1>
        <Table>
            <thead>
                <tr>
                    <th>Legajo</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                </tr>
            </thead>
            <tbody>
                {resources.map(data => {
                    return <RecursosRow key={data.resourceID} data={data}/>;
                    })}
            </tbody>
        </Table>
        </div>
    )
    
}

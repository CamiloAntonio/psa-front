import React, { useState, useEffect } from 'react'
import {Table} from 'reactstrap'
import RecursosRow from './RecursosRow'
import ResourceService from "services/soporte/resource.service";


export default function Recursos() {
    const [resources, setResources] = useState([]);

    function updateResources(data) {  
        setResources(_ => {
            return data;
        });
    }

    useEffect(() => {
        ResourceService.getResources(function(data) {
            updateResources(data);
        })
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

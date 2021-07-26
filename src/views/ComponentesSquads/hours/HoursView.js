import React, { useState, useEffect } from 'react'
import {Table, FormGroup, Label, Input} from 'reactstrap'
import HoursRow from './HoursRow';
import ResourceService from "services/soporte/resource.service";
import HoursService from "services/soporte/hour.service"

export default function HoursView() {
    const [hours, setHours] = useState([]);
    const [resources, setResources] = useState({});
    const [resourcesWanted, setResourcesWanted] = useState([1,2,3]);

    const handleChange = e => {
        const {name, value} = e.target;
        if (value == 0) {
            setResourcesWanted([1,2,3]);
        } else {
            setResourcesWanted([Number(value)]);
        }
    };

    function updateResources(data) {
        var allResources = {};
        for (var r, i = 0; r = data[i++];) {
            var resID = r.resourceID;

            if (!(resID in allResources)) {
                allResources[resID] = r.name + r.surname; 
            }
        }


        setResources(_ => {
            return data;
        })
    }

    function updateHours(data) {
        setHours(data)
    }

    function updateResources(data) {
        var resourcesDict = {};
        for (var d, i = 0; d = data[i++];) {
            if (!(d.resourceID in resourcesDict)) {
                resourcesDict[d.resourceID] = d.name + " " + d.surname;
            }
        }
        setResources(resourcesDict);
    }

    // Cargar nombres de recursos
    useEffect(() => {
        ResourceService.getResources(function(response) {
            updateResources(response);
        })
    }, []);

    // Cargar horas
    useEffect(() => {
        HoursService.getHours(function(response) {
            updateHours(response);
        })
    }, []);

    return (
        <div className="content">
            <h1>Horas Cargadas</h1>
            <FormGroup>
                <Label>Recurso</Label>
                <Input type="select" name="responsible" onChange={handleChange} id="resource">
                    <option value={0}>Todos los recursos</option>
                    {Object.keys(resources).map(resID => {
                            return <option value={resID}>{resources[resID]}</option>
                        })
                    }
                </Input>
            </FormGroup>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Responsable</th>
                        <th>Horas</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {hours.map(data => {
                        if (resourcesWanted.includes(data.responsibleResourceID)) {
                            return <HoursRow key={data.id} id={data.id} responsibleName={resources[data.responsibleResourceID]} quantity={data.quantity} date={data.date}/>;
                        } 
                    })}
                </tbody>
            </Table>
        </div>
    )
}
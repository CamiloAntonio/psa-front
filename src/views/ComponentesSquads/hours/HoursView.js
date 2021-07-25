import React, { useState, useEffect } from 'react'
import {Table, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import HoursRow from './HoursRow';

export default function HoursView() {
    const [hours, setHours] = useState([]);
    const [resources, setResources] = useState({});

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
        fetch("http://psa-resources-module.herokuapp.com/resource").then(
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

    // Cargar horas
    useEffect(() => {
        fetch("http://psa-hours-module.herokuapp.com/hour").then(
            function(response) {
                if (response.status !== 200) {
                    console.log("Error obteniendo las horas");
                    return;
                }

                response.json().then(function(data) {
                    updateHours(data);
                })
            }
        )
        .catch(function(err) {
            console.log("Error de Fetch");
        });
    }, []);

    return (
        <div className="content">
            <h1>Horas Cargadas</h1>
            <UncontrolledDropdown group>
                <DropdownToggle caret color="secondary" data-toggle="dropdown">
                    Text
                </DropdownToggle>
                <DropdownMenu>
                    {Object.values(resources).map(name => {
                        return <DropdownItem>{name}</DropdownItem>
                    })}
                </DropdownMenu>
            </UncontrolledDropdown>
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
                    return <HoursRow key={data.id} id={data.id} responsibleName={resources[data.responsibleResourceID]} quantity={data.quantity} date={data.date}/>;
                    })}
                </tbody>
            </Table>
        </div>
    )
}
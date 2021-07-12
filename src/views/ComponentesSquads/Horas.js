import React from 'react'
import {Input, Button, Table, ButtonGroup} from 'reactstrap'

export default function Recursos() {
    return (
        <div className="content">
            <h1>Carga de Horas</h1>
            <h3>Proyecto PSA - Tarea Programar Front End</h3>
            <div>Ingrese la cantidad de horas trabajadas</div>
            <Input placeHolder="Horas" type="number" min={0} max={24}></Input>        
            <Button color="secondary" size="sm">Cancelar</Button>
            <Button color="primary" size="sm" disabled>Guardar</Button>
            <hr color="#4c4c4c"></hr>
            <h3>Tus Horas en Programar Front End</h3>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Horas</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>6</td>
                        <td>5/6/21</td>
                        <td className="text-right">
                            <ButtonGroup>
                                <Button color="secondary" size="sm" >Eliminar</Button>
                                <Button color="secondary" size="sm">Modificar</Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>2</td>
                        <td>6/6/21</td>
                        <td className="text-right">
                            <ButtonGroup>
                                <Button color="secondary" size="sm" >Eliminar</Button>
                                <Button color="secondary" size="sm">Modificar</Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>5</td>
                        <td>29/7/21</td>
                        <td className="text-right">
                            <ButtonGroup>
                                <Button color="secondary" size="sm" >Eliminar</Button>
                                <Button color="secondary" size="sm">Modificar</Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
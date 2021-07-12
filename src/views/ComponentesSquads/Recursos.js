import React from 'react'
import {Input, Button, Table, ButtonGroup} from 'reactstrap'

export default function Recursos() {
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
                <tr>
                    <th scope="row">1</th>
                    <td>Santiago</td>
                    <td>Czop</td>
                    
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Santiago</td>
                    <td>Tadini</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Thiago</td>
                    <td>Kovnat</td>
                </tr>
            </tbody>
        </Table>
        </div>
    )
}

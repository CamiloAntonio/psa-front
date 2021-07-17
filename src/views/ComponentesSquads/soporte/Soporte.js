import React from 'react'
import { Table,Button } from 'reactstrap';
import TicketService from "../../../services/soporte/TicketService";



export default function Soporte() {
    const productos = [{
        nombre:"PSA Business Analytics",
        version:"3.1.0"
    },{
        nombre:"PSA Spring CRM",
        version:"2.0.0"
    },{
        nombre:"PSA Business Analytics",
        version:"2.0.1"
    },{
        nombre:"PSA Spring REP",
        version:"3.3.1"
    },{
        nombre:"PSA Spring REP",
        version:"2.2.0"
    }];


    return (
        <div className="content">
            <h1>Productos PSA</h1>


            {<Table responsive>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Version</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) =>
                        <tr>
                            <td>{producto.nombre}</td>
                            <td>{producto.version}</td>
                            <td className="text-right">
                                <Button className="btn-info" color="info" size="sm" onClick={(e)=>TicketService.getTickets()}>
                                    Tickets
                                </Button>    
                            </td>
                        </tr>)}
                    
                </tbody>
            </Table>}

        </div>
    )
}

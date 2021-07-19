import { Button , FormGroup,
    Label,
    Input,
    Table
    } from 'reactstrap';

import React from "react";


import { Link } from 'react-router-dom';
import TicketService from "../../../services/soporte/ticket.service";


function displayTicket(tck) {
    return (
        <tr>
            <td>{tck.ticketNumber}</td>
            <td>{tck.description}</td>
            <td>{tck.state}</td>
            <td>{tck.responsible}</td>
            <td>{tck.deadLine}</td>

            <td className="text-right">
                <Button className="primary" color="primary" size="sm">
                    <i className="tim-icons icon-simple-add"/>{" "}
                    Tarea
                </Button>{` `}
                <Button className="btn-icon" color="info" size="sm">
                    <i className="fa fa-edit"></i>
                </Button>{` `}
            </td>
        </tr>

    )
} 

export default function Tickets() {

    const [tickets, setTickets] = React.useState(null);

    React.useEffect(() => {
        TicketService.getTickets(function(res){
            console.log(res)
            setTickets(res);    
        })
    }, []);
  
    if (!tickets) return null;

    return (
        <div className="content">
            <h1>Tickets</h1>
            <form>
                <FormGroup>
                    <Label for="exampleEmail">Ingrese Nro. Ticket</Label>
                    <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    />
                </FormGroup>
                <Button color="info" size="sm" type="submit">
                    Buscar
                </Button>
            </form>

            <hr color="#4c4c4c"></hr>
        
            <div className="text-left">
                <Link to="./creacion_ticket">
                    <Button className="primary" color="primary" size="sm">
                    <i className="tim-icons icon-simple-add"/>{" "}
                    Ticket
                    </Button>
                </Link>
            </div>

            <Table>
                <thead>
                    <tr>
                        <th>Nro Ticket</th>
                        <th>Titulo</th>
                        <th>Estado</th>
                        <th>Agente</th>
                        <th>Vencimiento</th>
                    </tr>
                </thead>
                <tbody>
                    {   
                        tickets.map(tck => displayTicket(tck))
                    }
                </tbody>
            </Table>
        </div>
    )
}

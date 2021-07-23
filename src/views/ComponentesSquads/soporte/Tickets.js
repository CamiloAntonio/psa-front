import { Button , FormGroup,
    Label,
    Input,
    Table,
    Alert
    } from 'reactstrap';

import React,{useState , useEffect} from "react";
import { Link,useParams,useRouteMatch} from 'react-router-dom';
import TicketService from "services/soporte/ticket.service";


function displayTicket(tck,url) {

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
                <Link to={`${url}${tck.ticketNumber}/edicion_ticket`}>
                    <Button className="btn-icon" color="info" size="sm">
                        <i className="fa fa-edit"></i>
                    </Button>{` `}
                </Link>
            </td>
        </tr>

    )
} 

export default function Tickets() {
    let {product,version} = useParams();
    let { path, url } = useRouteMatch();

    const [tickets, setTickets] = useState(null);
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        let handleResponse  = function (tcks) {
            setTickets(tcks);
            setHidden((tcks.length > 0));
        }

        TicketService.getTicketByProductAndVersion(product,version,handleResponse)
    }, [product,version]);
  
    if (!tickets) return null;

    return (
        <div className="content">
            <h1>Tickets - {product} - Version: {version} </h1>
            <form>
                <FormGroup>
                    <Label for="exampleEmail">Ingrese Nro. Ticket</Label>
                    <Input
                    type="number"
                    name="numeroTicket"
                    id="exampleEmail"
                    />
                </FormGroup>
                <Button color="info" size="sm" type="submit">
                    Buscar
                </Button>
            </form>

            <hr color="#4c4c4c"></hr>

            <div className="text-left">
                <Link to={`${url}creacion_ticket`}>
                    <Button className="primary" color="primary" size="sm">
                    <i className="tim-icons icon-simple-add"/>{" "}
                    Ticket
                    </Button>
                </Link>
            </div>

            {!hidden && <Alert color="default">No hay tickets asociados</Alert>}

            {hidden && <Table>
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
                        tickets.map(tck => displayTicket(tck,url))
                    }
                </tbody>
            </Table>}
        </div>
    )
}

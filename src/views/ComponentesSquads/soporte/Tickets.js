import { Button , FormGroup,
    Label,
    Input,
    Table,
    Alert
} from 'reactstrap';

import React,{useState , useEffect} from "react";
import { Link,useParams,useRouteMatch} from 'react-router-dom';
import TicketService from "services/soporte/ticket.service";
import ResourceService from "services/soporte/resource.service";

function Responsible(props) {
    const [resourceName, setResourceName] = useState(null);

    useEffect(() => {
        let responsible = props.id;
        let handleResponse  = function (resource) {
            setResourceName(resource.name + " " + resource.surname);
        }

        if (responsible === "0") {
            setResourceName("Sin Asignar");
        } else {
            ResourceService.getResourceWithId(responsible,handleResponse);
        }
    }, []);

    if (!resourceName) return <td>cargando agente...</td>;

    return <td onClick={props.handleClick}>{resourceName}</td>
}

function displayRow(tck,url) {

    const handleClick = () => {
      window.location = `${url}/${tck.ticketNumber}`
    };

    return (
        <tr>
            <td onClick={handleClick}>{tck.ticketNumber}</td>
            <td onClick={handleClick}>{tck.title}</td>
            <td onClick={handleClick}>{tck.state}</td>
            <Responsible id={tck.responsible} handleClick={handleClick}/>
            <td onClick={handleClick}>{tck.deadLine}</td>
            <td className="text-right">
                <Button className="primary" color="primary" size="sm">
                    <i className="tim-icons icon-simple-add"/>{" "}
                    Tarea
                </Button>{` `}
                <Link to={`${url}/${tck.ticketNumber}/edicion_ticket`}>
                    <Button className="btn-icon" color="info" size="sm">
                        <i className="fa fa-edit"/>
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
    const [noResults, setNoResult] = useState(true);
    const [nroTicket, setNroTicket] = useState(-1);

    const handleChange = e => {
        const {name, value} = e.target;
        setNroTicket(value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        if(nroTicket > 0) {
            TicketService.getTicketById(nroTicket,function(res) {
                if(Object.keys(res).length === 0) {
                    setNoResult(true);
                } else {
                    setTickets([res]);
                    setNoResult(false);
                }
            });
        } else {
            fetchAllTickets(product,version);
        }
    };

    function fetchAllTickets(product,version) {
        let handleResponse  = function (tcks) {
            setTickets(tcks);
            setNoResult((tcks.length <= 0));
        }

        TicketService.getTicketByProductAndVersion(product,version,handleResponse)
    }

    useEffect(() => {
        fetchAllTickets(product,version);
    }, [product,version]);

    if (!tickets) return <h2>cargando tickets...</h2>;

    return (
        <div className="content">
            <h1>Tickets - {product} - Version: {version} </h1>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="exampleEmail">Ingrese Nro. Ticket</Label>
                    <Input
                    type="number"
                    name="numeroTicket"
                    id="exampleEmail"
                    onChange={handleChange}
                    />
                </FormGroup>
                <Button color="info" size="sm" type="submit">
                    Buscar
                </Button>
            </form>

            <hr color="#4c4c4c"/>

            <div className="text-left">
                <Link to={`${url}/creacion_ticket`}>
                    <Button className="primary" color="primary" size="sm">
                    <i className="tim-icons icon-simple-add"/>{" "}
                    Ticket
                    </Button>
                </Link>
            </div>

            {noResults && <Alert color="default">No hay tickets asociados</Alert>}

            {!noResults && <Table>
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
                      tickets.map(tck => displayRow(tck,url))
                    }
                </tbody>
            </Table>}
        </div>
    )
}

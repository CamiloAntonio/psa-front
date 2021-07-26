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
                <Link to={{
                    pathname:"/admin/crear-tarea/" + tck.ticketNumber,
                    state: { fromDashboard: true }
                }}>
                    <Button className="primary" color="primary" size="sm">
                        <i className="tim-icons icon-simple-add"/>{" "}
                        Tarea
                    </Button>{` `}
                </Link>

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
    const [loading, setLoading] = useState(true);
    const [nroTicket, setNroTicket] = useState(-1);

    const handleChange = e => {
        const {name, value} = e.target;
        setNroTicket(value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        if(nroTicket > 0) {
            fetchTicketById(nroTicket);
        } else {
            fetchAllTickets(product,version);
        }
    };

    function playAnimation() {
        setLoading(true);

    }

    function stopAnimation() {
         setLoading(false);
    }

    function fetchTicketById(id) {
        playAnimation();        

        let handleError = (error) => {
            console.log(error);
            setNoResult(true);
            stopAnimation();
        }

        let handleSuccess = (res) => {
            setTickets([res]);
            setNoResult(false);
            stopAnimation();
        }

        TicketService.getTicketById(id,handleSuccess,handleError);
    }

    function fetchAllTickets(product,version) {
        playAnimation();
        let handleResponse  = function (tcks) {
            setTickets(tcks);
            setNoResult((tcks.length <= 0));
            stopAnimation();
        }

        TicketService.getTicketByProductAndVersion(product,version,handleResponse)
    }

    useEffect(() => {
        setTimeout(() => {
            fetchAllTickets(product,version);
        }, 1000)
    }, [product,version]);


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

            {loading && 
                //loading page
                <div className="content">
                    <style> 
                        {"\
                        .loader {\
                            border: 16px solid #f3f3f3;\
                            border-radius: 50%;\
                            border-top: 16px solid #3498db;\
                            width: 120px;\
                            height: 120px;\
                            -webkit-animation: spin 2s linear infinite; /* Safari */\
                            animation: spin 2s linear infinite;\
                        }\
                        "}
                    
                        {"\ @keyframes spin {\
                                0% { transform: rotate(0deg); }\
                                100% { transform: rotate(360deg); }\
                            }\
                            "}
                    </style>
                    <div class="loader"/>
                </div>}

            {noResults && !loading && <Alert color="default">No hay tickets asociados</Alert>}

            {!noResults && !loading &&<Table hover>
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

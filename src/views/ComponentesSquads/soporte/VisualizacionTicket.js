import {
    FormGroup,
    Label,
    Input,
    Button,
    Card,
    CardBody, Form
} from "reactstrap";

import React,{useEffect,useState} from "react";
import {Link, useParams, useRouteMatch} from "react-router-dom";
import TicketService from "services/soporte/ticket.service";
import ResourceService from "services/soporte/resource.service";

export default function VisualizacionTicket() {

    const [ticket,setTicket] = useState([]);
    const [resource, setResource] = useState([]);

    let {product,version,ticketId} = useParams();
    let { path, url } = useRouteMatch();

    useEffect(() => {
        TicketService.getTicketById(ticketId,function(res){
            setTicket(res);
            //Agregar condicion de resource id = 0
            ResourceService.getResourceWithId(res.responsible,function(res){
                setResource(res);
            })
        })

    }, [ticketId]);

    if (!ticket || !resource) return null;

    return (
         <div className="content">
             <h1>Ticket #{ticketId} - {product} - version: {version}</h1>

             <Card>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="titulo">Título </Label>
                            <Input
                                type="text"
                                name="titulo"
                                id="titulo"
                                required
                                value={ticket.title}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="severidad">Severidad </Label>
                            <Input
                                type="text"
                                name="severidad"
                                id="severidad"
                                required
                                value={ticket.severity}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="cliente">Cliente *</Label>
                            <Input
                                type="text"
                                name="textCliente"
                                id="cliente"
                                required
                                readOnly
                                value={ticket.client}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="agente">Agente</Label>
                            <Input
                                type="text"
                                name="textAgente"
                                id="agente"
                                required
                                readOnly
                                value={resource.name + " " + resource.surname}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="estado">Estado *</Label>
                            <Input
                                type="text"
                                name="textEstado"
                                id="estado"
                                required
                                readOnly
                                value={ticket.state}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="descripcion">Descripción *</Label>
                            <Input
                                type="textarea"
                                name="descripcion"
                                id="descripcion"
                                placeholder="Ingrese una descripcion para el ticket"
                                required
                                readOnly
                                value={ticket.description}
                            />
                        </FormGroup>
                        <div className="text-right">
                            <Link to="./tickets">
                                    <Button color="info" size="sm">
                                        Volver
                                    </Button>
                            </Link>
                            <Link to={`${url}/edicion_ticket`}>
                                <Button color="primary" size="sm">
                                    Editar
                                </Button>
                            </Link>
                        </div>
                    </Form>
                </CardBody>
             </Card>

         </div>
    )

}
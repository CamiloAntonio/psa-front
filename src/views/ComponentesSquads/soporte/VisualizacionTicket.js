import React from "react";

import {
    FormGroup,
    Label,
    Input,
    FormText,
    Button,
    Card,
    CardBody, Form
} from "reactstrap";

import {Link, useParams, useRouteMatch} from "react-router-dom";
import TicketService from "../../../services/soporte/ticket.service";
import ResourceService from "../../../services/soporte/resource.service";

export default function VisualizacionTicket() {

    const [ticket,setTicket] = React.useState(null);
    const [resource, setResource] = React.useState(null);

    let {product,version,ticketId} = useParams();
    let { path, url } = useRouteMatch();

    //Ver que para getear el resource necesito el ticket responsible que getea el ticketService,pero por alguna razon devuelve el ticket nulo
    React.useEffect(() => {
        TicketService.getTicketById(ticketId,function(res){
            console.log(res)
            setTicket(res);
        })

        //Esto no funciona,lo que se me ocurre es pasar el id del responsable directamente por URL y tomarlo de ahi
        ResourceService.getResourceWithId(ticket.responsible,function(res){
            console.log(res)
            setResource(res);
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
                                value={ticket.responsible}
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
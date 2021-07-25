import {
    FormGroup,
    Label,
    Input,
    Button,
    Card,
    CardBody, Form
} from "reactstrap";

import React,{useEffect,useState} from "react";
import {Link, useParams, useRouteMatch, useHistory} from "react-router-dom";
import TicketService from "services/soporte/ticket.service";
import ResourceService from "services/soporte/resource.service";

export default function VisualizacionTicket() {

    const [ticket,setTicket] = useState([]);
    const [resource, setResource] = useState({resourceID:0,name:"Sin asignar",surname:""});

    let {product,version,ticketId} = useParams();
    let { path, url } = useRouteMatch();
    let history = useHistory();

    const goToPreviousPath = () => {
        history.goBack()
    }

    useEffect(() => {
        TicketService.getTicketById(ticketId,function(res){
            setTicket(res);
            if (res.responsible !== "0") {
                ResourceService.getResourceWithId(res.responsible,function(res){
                    setResource(res);
                })
            }
        })

    }, [ticketId]);

    if (!ticket) return null;

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
                            <Label for="cliente">Cliente </Label>
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
                            <Label for="estado">Estado </Label>
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
                            <Label for="fechaDeCreacion">Fecha de creación</Label>
                            <Input
                                type="textarea"
                                name="fechaDeCreacion"
                                id="fechaDeCreacion"
                                placeholder="Ingrese una descripcion para el ticket"
                                required
                                readOnly
                                value={ticket.createdDate}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="fechaDeVencimiento">Fecha de vencimiento</Label>
                            <Input
                                type="textarea"
                                name="fechaDeVencimiento"
                                id="fechaDeVencimiento"
                                placeholder="Ingrese una descripcion para el ticket"
                                required
                                readOnly
                                value={ticket.deadLine}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="fechaDeUltModificacion">Fecha de última modificación</Label>
                            <Input
                                type="textarea"
                                name="fechaDeUltModificacion"
                                id="fechaDeUltModificacion"
                                placeholder="Ingrese una descripcion para el ticket"
                                required
                                readOnly
                                value={ticket.lastModifiedDate}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="tareasAsignadas">Tareas asignadas</Label>
                            <Input
                                type="textarea"
                                name="tareasAsignadas"
                                id="tareasAsignadas"
                                placeholder="Ingrese una descripcion para el ticket"
                                required
                                readOnly
                                value="ACA VAN LAS TAREAS ASOCIADAS"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="descripcion">Descripción </Label>
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
                            <Button color="info" size="sm" onClick={goToPreviousPath}>
                                Volver
                            </Button>
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
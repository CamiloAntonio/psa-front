
import {
    FormGroup,
    Label,
    Input,
    Button,
    Card,
    CardBody
} from "reactstrap";

import React,{useState , useEffect} from "react";
import { Link,useParams } from 'react-router-dom';

import ResourceService from "../../../services/soporte/resource.service";
import ClientService from "../../../services/soporte/client.service";
import TicketService from "../../../services/soporte/ticket.service";

export default function CreacionTicket() {

    const severidades = [{nombre:"S1",info:"S1 (7 dias para resolver)"},
        {nombre:"S2",info:"S2 (30 dias para resolver)"},
        {nombre:"S3",info:"S3 (90 dias para resolver)"},
        {nombre:"S4",info:"S4 (365 dias para resolver)"}]

    const clientes = [{nombre:"Cliente1"},
        {nombre:"Cliente2"},
        {nombre:"Cliente3"}]

    const agentes = [{nombre:"Sin asignar"},
        {nombre:"Agente1"},
        {nombre:"Agente2"},
        {nombre:"Agente3"}]

    let {product,version} = useParams();

    const [newTicket,setNewTicket] = useState({
        "client": "",
        "createdDate": "",
        "deadLine": "",
        "description": "",
        "lastModifiedDate": "",
        "linkedTasks": [],
        "product": product,
        "responsible": "",
        "severity": "",
        "state": "",
        "ticketNumber": -1,
        "title": "",
        "version": version
    });


    const handleChange = e => {
        const {name, value} = e.target;

        setNewTicket({
            ...newTicket,
            [name] : value
        });
    };


    const handleSubmit = e => {
        e.preventDefault();
        console.log(newTicket);
        TicketService.createTicket();
    };

    const [clients,setClients] = React.useState(null);
    const [resources, setResources] = React.useState(null);


    React.useEffect(() => {
        ClientService.getClients(function(res){
            console.log(res)
            setClients(res);
        })

        ResourceService.getResources(function(res){
            console.log(res)
            setResources(res);
        })
    },[setClients,setResources]);

    if (!clients || !resources) return null;

    return (
        <div className="content">
             <h1>Creacion de ticket - {product} - Version: {version}</h1>

            <Card>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="titulo">Título *</Label>
                            <Input
                                type="text"
                                name="title"
                                id="titulo"
                                placeholder="Ingerese un título"
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="severidad">Severidad *</Label>
                            <Input type="select" name="severity" id="severidad" onChange={handleChange} required>
                                <option value="" selected disabled hidden>Seleccione la severidad</option>
                                {severidades.map((severidad) =>
                                    <option value={severidad.nombre}>{severidad.info}</option>
                                )}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="cliente">Cliente *</Label>
                            <Input type="select" name="client" id="cliente" onChange={handleChange} required>
                                <option value="" selected disabled hidden>Seleccione el cliente al que quiera asociar el ticket</option>
                                {clients.map((client) =>
                                    <option value={client.resourceID}>{client.name + " " + client.surname}</option>
                                )}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="agente">Agente</Label>
                            <Input type="select" name="responsible" onChange={handleChange} id="agente">
                                {resources.map((resource) =>
                                    <option>hola</option>
                                )}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="descripcion">Descripción *</Label>
                            <Input
                                type="textarea"
                                name="description"
                                id="descripcion"
                                placeholder="Ingrese una descripcion para el ticket"
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <div className="text-right">
                            <Link to="./">
                                <Button color="info" size="sm">
                                    Volver
                                </Button>
                            </Link>
                            <Button color="primary" type="submit" size="sm">
                                Crear
                            </Button> {' '}
                        </div>
                    </form>
                </CardBody>
            </Card>

        </div>
    )
}



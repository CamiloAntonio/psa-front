import {
    FormGroup,
    Label,
    Input,
    Button,
    Card,
    CardBody,
    Alert
} from "reactstrap";

import React,{useState , useEffect} from "react";
import { useParams,useHistory } from 'react-router-dom';

import ResourceService from "services/soporte/resource.service";
import ClientService from "services/soporte/client.service";
import TicketService from "services/soporte/ticket.service";

export default function CreacionTicket() {
    let {product,version} = useParams();

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    const severidades = [{nombre:"S1",info:"S1 (7 dias para resolver)"},
        {nombre:"S2",info:"S2 (30 dias para resolver)"},
        {nombre:"S3",info:"S3 (90 dias para resolver)"},
        {nombre:"S4",info:"S4 (365 dias para resolver)"}]

    const [newTicket,setNewTicket] = useState({
        "client": "",
        "createdDate": "",
        "deadLine": "",
        "description": "",
        "lastModifiedDate": "",
        "linkedTasks": [],
        "product": product,
        "responsible": "0",
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
        TicketService.createTicket(newTicket,function(res) {
            console.log(res);
            setSubmitAlertVisible({visible:true,res:res});
        });
    };

    const onDismiss = () => setSubmitAlertVisible({visible:false,res:""});

    const [clients,setClients] = useState([]);
    const [resources, setResources] = useState([]);
    const [submitAlertVisible, setSubmitAlertVisible] = React.useState({visible:false,res:""});

    useEffect(() => {
        ResourceService.getResources(function(res){
            setResources(res);
        })

        ClientService.getClients(function (res){
            setClients(res);
        })

    },[setResources,setClients]);

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
                                    <option>{client.name}</option>
                                )}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="agente">Agente</Label>
                            <Input type="select" name="responsible" onChange={handleChange} id="agente">
                                <option value={0}>Sin Asignar</option>
                                {resources.map((resource) =>
                                    <option value={resource.resourceID}>{resource.name + " " + resource.surname}</option>
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
                            <Button color="info" size="sm" onClick={goToPreviousPath}>
                                Volver
                            </Button>
                            <Button color="primary" type="submit" size="sm">
                                Crear
                            </Button> {' '}
                            <Alert color="info" isOpen={submitAlertVisible.visible} toggle={onDismiss}>
                                    <span>
                                        {submitAlertVisible.res}
                                    </span>
                            </Alert>
                        </div>
                    </form>
                </CardBody>
            </Card>

        </div>
    )
}



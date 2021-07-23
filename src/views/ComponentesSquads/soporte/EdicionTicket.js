
import {
    FormGroup,
    Label,
    Input,
    Button,
    Card,
    CardBody
} from "reactstrap";

import React from "react";

import TicketService from "services/soporte/ticket.service";
import ResourceService from "services/soporte/resource.service";
import {useParams,useHistory} from "react-router-dom";
import {ESTADOS} from "./estados"


//function desplegarSeveridades (severidad, tktSeverity) {
//    if (severidad.nombre !== tktSeverity) return <option value={severidad.nombre}>{severidad.info}</option>
//    else return <option value={severidad.nombre} selected>{severidad.info}</option>
//}

//function desplegarEstados (estado, tktState) {
//    if (estado !== tktState) return <option>{estado}</option>
//    else return <option selected>{estado}</option>
//}

//function desplegarAgentes (agente, tktResponsible) {
//    if (agente.resourceID !== parseInt(tktResponsible,10)) return <option value={agente.resourceID}>{agente.name + " " + agente.surname}</option>
//    else return <option value={agente.resourceID} selected>{agente.name + " " + agente.surname}</option>
//}


function createOption(text,fcmp,param1,param2,value=null) {
    return React.createElement('option',{value:value,selected:fcmp(param1,param2)},text);
}

export default function EdicionTicket() {
    let {product,version,ticketId} = useParams();

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    const severidades = [{nombre:"S1",info:"S1 (7 dias para resolver)"},
        {nombre:"S2",info:"S2 (30 dias para resolver)"},
        {nombre:"S3",info:"S3 (90 dias para resolver)"},
        {nombre:"S4",info:"S4 (365 dias para resolver)"}]

    const handleChange = e => {
        const {name, value} = e.target;

        setTicket({
            ...ticket,
            [name] : value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(ticket);
        TicketService.updateTicket(ticket);
    };

    const [ticket,setTicket] = React.useState([]);
    const [resources, setResources] = React.useState([]);

    React.useEffect(() => {
        TicketService.getTicketById(ticketId,function(res){
            console.log(res)
            setTicket(res);
        })

        ResourceService.getResources(function(res){
            setResources(res);
        })
    }, [ticketId]);

    if (!ticket || !resources) return null;

    return (
         <div className="content">
             <h1>Edicion Ticket #{ticketId} - {product} - version: {version}</h1>
                <Card>
                    <CardBody>
                        <form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="titulo">Título *</Label>
                                <Input
                                    type="text"
                                    name="titulo"
                                    id="titulo"
                                    placeholder="Ingerese un título"
                                    required
                                    value={ticket.title}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="severidad">Severidad *</Label>
                                <Input type="select" name="severity" id="severidad" onChange={handleChange} required>
                                    {severidades.map((severidad) =>
                                        //desplegarSeveridades(severidad,ticket.severity)
                                        createOption(severidad.nombre,(severidad, tktSeverity) => {
                                            return (severidad == tktSeverity)
                                        },severidad.nombre,ticket.state,severidad.info)
                                    )}
                                </Input>
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
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="agente">Agente</Label>
                                <Input type="select" name="responsible" id="agente" onChange={handleChange}>

                                    <option>Sin Asignar</option>
                                    {resources.map((resource) =>
                                        //desplegarAgentes(resource,ticket.responsible)
                                        createOption((resource.name + " " + resource.surname),(agenteId,tktResponsible) => {
                                            return (agenteId === parseInt(tktResponsible,10))
                                        },resource.resourceID,ticket.responsible,resource.resourceID)
                                    )}

                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="estado">Estado *</Label>
                                <Input type="select" name="state" id="estado" onChange={handleChange}>
                                    {/*<option value="" selected disabled hidden>Seleccione el estado del ticket</option>*/}
                                    {ESTADOS.map((state) =>
                                        //desplegarEstados(estado.nombre,ticket.state)
                                        createOption(state.nombre,(state,tktState) => {
                                            return state == tktState
                                        },state.nombre,ticket.state)
                                    )}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="descripcion">Descripción *</Label>
                                <Input
                                    type="textarea"
                                    name="descripcion"
                                    id="descripcion"
                                    placeholder="Ingrese una descripcion para el ticket"
                                    required
                                    value={ticket.description}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <div className="text-right">
                                <Button color="info" size="sm" onClick={goToPreviousPath}>
                                    Volver
                                </Button>
                                <Button color="danger" size="sm">
                                    Eliminar
                                </Button>
                                <Button color="primary" type="submit"  size="sm">
                                    Confirmar cambios
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
         </div>
    )
}

import {
    FormGroup,
    Label,
    Input,
    Button,
    Card,
    CardBody,
    Modal, 
    ModalHeader, 
    ModalBody,
    ModalFooter
} from "reactstrap";

import React from "react";

import TicketService from "services/soporte/ticket.service";
import ResourceService from "services/soporte/resource.service";
import {useParams,useHistory} from "react-router-dom";
import {ESTADOS} from "./estados"

function createOption(text,fcmp,param1,param2,value=null) {
    return React.createElement('option',{value:value,selected:fcmp(param1,param2)},text);
}


const ConfirmationModal = (props) => {
    const {
      buttonLabel,
      className,
      ticketNumber
    } = props;
  
    const [modal, setModal] = React.useState(false);
  
    const toggle = () => setModal(!modal);

    const handleDeleteClick = e => {
        e.preventDefault();
        console.log(ticketNumber);
        TicketService.deleteTicketById(ticketNumber,function (res) {
            console.log(res);
            //setDeleteMessage(res);
        });
    };
  
    return (
      <div>
        <Button color="danger" onClick={toggle} size="sm">{buttonLabel}</Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>Eliminar Ticket</ModalHeader>
          <ModalBody>
            Usted desea eliminar el ticket?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleDeleteClick}>Eliminar</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
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
    const [deleteMessage, setDeleteMessage] = React.useState([])

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
                                        createOption(severidad.info,(severidad, tktSeverity) => {
                                            return (severidad === tktSeverity)
                                        },severidad.nombre,ticket.severity,severidad.nombre)
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

                                    <option value={0}>Sin Asignar</option>
                                    {resources.map((resource) =>
                                        createOption((resource.name + " " + resource.surname),(agenteId,tktResponsible) => {
                                            return (agenteId === parseInt(tktResponsible,10))
                                        },resource.resourceID,ticket.responsible,resource.resourceID)
                                    )}

                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="estado">Estado *</Label>
                                <Input type="select" name="state" id="estado" onChange={handleChange}>
                                    {ESTADOS.map((state) =>
                                        createOption(state.nombre,(state,tktState) => {
                                            return state === tktState
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
                                <ConfirmationModal buttonLabel="Eliminar" ticketNumber={ticket.ticketNumber}/>
                                <Button color="info" size="sm" onClick={goToPreviousPath}>
                                    Volver
                                </Button>
                                {/*<Button color="danger" size="sm" onClick={handleDeleteClick}>
                                    Eliminar
                                    </Button>*/}
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
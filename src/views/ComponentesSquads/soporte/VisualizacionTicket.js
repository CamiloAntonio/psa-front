import {
    Button,
    Card,
    CardBody,
    CardText,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Alert
} from "reactstrap";

import React,{useEffect,useState} from "react";
import {useParams, useRouteMatch, useHistory} from "react-router-dom";
import TicketService from "services/soporte/ticket.service";
import ResourceService from "services/soporte/resource.service";


const ConfirmationModal = (props) => {
    const {
      buttonLabel,
      className,
      ticketNumber
    } = props;

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    const [modal, setModal] = React.useState(false);
    const [submitAlertVisible, setSubmitAlertVisible] = React.useState({visible:false,res:""});

    const onDismiss = () => setSubmitAlertVisible({visible:false,res:""});
    const toggle = () => setModal(!modal);

    const handleDeleteClick = e => {
        e.preventDefault();
        console.log(ticketNumber);
        TicketService.deleteTicketById(ticketNumber,function (res) {
            console.log(res);
            setSubmitAlertVisible({visible:true,res:res});
        });
        toggle();
    };

    return (
      <div>
        <Button color="info" size="sm" onClick={goToPreviousPath}>
            Volver
        </Button>
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
        <Alert color="info" isOpen={submitAlertVisible.visible} toggle={onDismiss}>
            <span>
                {submitAlertVisible.res}
            </span>
        </Alert>
      </div>
    );
  }

export default function VisualizacionTicket() {

    const [ticket,setTicket] = useState([]);
    const [resource, setResource] = useState({resourceID:0,name:"Sin asignar",surname:""});
    const [linkedTasks, setLinkedTasks] = useState([]);

    let {product,version,ticketId} = useParams();

    useEffect(() => {
        TicketService.getTicketById(ticketId,function(res){
            setTicket(res);
            if (res.responsible !== "0") {
                ResourceService.getResourceWithId(res.responsible,function(res){
                    setResource(res);
                })
            }
        })

        TicketService.getTickedLinkedTasks(ticketId,function (res){
            setLinkedTasks(res);
        })

    }, [ticketId]);

    if (!ticket) return null;

    return (
         <div className="content">

             <h1>Ticket #{ticketId} - {product} - version: {version}</h1>

                <Card style={{color:"#868686"}}>
                    <CardBody>
                        <CardText/> <b>Título:</b> {ticket.title}
                        <CardText style={{marginTop:10}}/> <b> Severidad:</b> {ticket.severity}
                        <CardText style={{marginTop:10}}/> <b> Cliente:</b> {ticket.client}
                        <CardText style={{marginTop:10}}/> <b> Agente: </b>{resource.name + " " + resource.surname}
                        <CardText style={{marginTop:10}}/> <b> Estado: </b>{ticket.state}
                        <CardText style={{marginTop:10}}/> <b> Fecha de creación: </b>{ticket.createdDate}
                        <CardText style={{marginTop:10}}/> <b> Fecha de vencimiento: </b>{ticket.deadLine}
                        <CardText style={{marginTop:10}}/> <b> Fecha de última modificación: </b>{ticket.lastModifiedDate}
                        <CardText style={{marginTop:10}}/> <b> Ids de tareas asociadas: </b>
                        <CardText style={{color:"#868686",marginTop:10}}>
                            {linkedTasks.map((task) =>
                                    <li style={{marginLeft:10}}>{task}</li>
                            )}
                        </CardText>
                        <CardText style={{marginTop:10}}/> <b> Descripción: </b>{ticket.description}
                    </CardBody>
                </Card>
                <div className="text-right">
                    {<ConfirmationModal buttonLabel="Eliminar" ticketNumber={ticket.ticketNumber}/>}
                </div>
         </div>
    )

}
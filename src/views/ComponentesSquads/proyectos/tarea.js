import React from 'react'
import { useEffect, useState } from 'react';
import projectService from 'services/project.service'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import DatePicker from "react-date-picker";
import Tickets from '../soporte/Tickets';
import Tareas from './tareas';


const sampleTask = {
  "nombre": "string",
  "descripcion": "string",
  "id_proyecto_asociado": 0,
  "persona_asignada": {
    "resourceID": 0,
    "name": "string",
    "surname": "string"
  },
  "fecha_inicio": (new Date()).toLocaleDateString(),
  "tickets": [ ]
}

 
const sampleLeaders= [{"legajo":1,"Nombre":"Mario","Apellido":"Mendoza"},{"legajo":2,"Nombre":"Maria","Apellido":"Perez"},{"legajo":3,"Nombre":"Patricia","Apellido":"Gaona"}]
const samplePersonas= [{"legajo":1,"Nombre":"Franco","Apellido":"Mendoza"}, {"legajo":1,"Nombre":"Camilo","Apellido":"Antonio"} ,{"legajo":2,"Nombre":"Lucia","Apellido":"Perez"},{"legajo":3,"Nombre":"Agustina","Apellido":"Gaona"}]


export default function CrearTarea({match}) {
  const [taskDetails, setTaskDetails] = useState(sampleTask)
  const [resources, setResources] = useState(sampleLeaders)
  const [projects, setProjects] = useState([])
  const [tickets, setTickets] = useState([])
  const [fechas, setFechas] = useState({fecha_inicio: new Date(), fecha_fin: undefined})

  useEffect(() => {
    projectService.getTickets()
    .then(res => res.json())
    .then(
      (result) => {
        setTickets(result)
        console.log(result)
      },
      (error) => {
        console.log("hubo error bro")
      }
    )
    projectService.getTaskById(match.params.id)
      .then(res => res.json())
      .then(
        (result) => {
            setTaskDetails(result)
            let newFechas = {...fechas}
            // for (i in fechas) {
            //     if(result[i].length>0) newFechas[i] = new Date(result[i])
            // }    

            newFechas.fecha_inicio = new Date(result.fecha_inicio)
            if(result.fecha_fin.length>0) newFechas.fecha_fin = new Date(result.fecha_fin)

            console.log("fechas trnasformadas", newFechas)
            setFechas(newFechas)
          console.log(result)
        },
        (error) => {
          console.log("hubo error bro")
        }
      )
    projectService.getResources()
      .then(res => res.json())
      .then(
        (result) => {
          setResources(result)
          console.log(result)
        },
        (error) => {
          console.log("hubo error bro")
        }
      )
      projectService.getProjects()
      .then(res => res.json())
      .then(
        (result) => {
          setProjects(result)
          console.log(result)
        },
        (error) => {
          console.log("hubo error bro")
        }
      )
  }, [])

  function handleEditTaskDetails(e) {
    console.log(e.target.id, e.target.value)
    let newTaskDetails = { ...taskDetails }
    newTaskDetails[e.target.name] = e.target.value
    setTaskDetails(newTaskDetails)
  }

   function handleSelectPersonaAsignada(e) {
    console.log(e.target.value )
    let newTaskDetails = { ...taskDetails }
    
    newTaskDetails.persona_asignada = resources.filter(r => r.resourceID == e.target.value)[0]
    setTaskDetails(newTaskDetails)
}


  function handleSelectProject(e) {
    let newTaskDetails = { ...taskDetails }
    
    newTaskDetails.id_proyecto_asociado = e.target.value
    setTaskDetails(newTaskDetails)
  }

  function handleSelectTicket(e) {
    console.log(e.target.value)

    // let newTicket = {title: e.target.value, ticketNumber: e.target.id }
    let newTicket = tickets.filter(t => (t.ticketNumber == e.target.value))
    console.log(newTicket)
    let newTickets = [...taskDetails.tickets, ...newTicket]

    let newTaskDetails = {...taskDetails, tickets: newTickets}
    setTaskDetails(newTaskDetails)
    
    // let newTaskDetails = { ...taskDetails }
    
    // newTaskDetails.tickets = newTickets

    // setTaskDetails(newTaskDetails)

    // (newTaskDetails)
  }


  function submitCreateTask() {
    projectService.updateTask(taskDetails).then(res => res.json()).then(
      (result) => {
        console.log(result)
        window.location.replace("/admin/tareas");
      },
      (error) => {
        console.log("hubo error bro")
      }
    )
  }

  function handleChangeFecha(e) {
    let newFechas = {...fechas}
    newFechas[e.name] = e.fecha
    setFechas(newFechas)
    let newTaskDetails = { ...taskDetails }
    newTaskDetails[e.name] = e.fecha.toLocaleDateString()
    setTaskDetails(newTaskDetails)
  }

  return (
    <div className="content">
      <h1>{taskDetails.nombre}</h1>
      <Row>
        <Col className="px-md-1" md="3">
          <FormGroup>
            <label>Nombre</label>
            <Input
              value={taskDetails.nombre}
              name="nombre"
              onChange={handleEditTaskDetails}
              placeholder="Nombre"
              type="text"
            />
          </FormGroup>
        </Col>


        {/*<Col className="pl-md-1" md="4">
          <FormGroup>
            <label>Personas asignadas</label>
            <Input  type="select" name="selectLeader" id="leader" required onChange={handleSelectPersonaAsginada}>
            {personas.map((persona) =>
                <option value={persona.legajo} key={persona.legajo}>{persona.Nombre} {persona.Apellido}</option>
                )}
                </Input>
                </FormGroup>
            </Col> */}

        <Col className="pl-md-1" md="3">
          <FormGroup>
            <label>Proyecto al que pertenece</label>
            <Input value={taskDetails.id_proyecto_asociado}  type="select" name="selectProjects" id="project" required onChange={handleSelectProject}>
                            {projects.map((project) =>
                                <option value={project.id} key={project.id}>{project.nombre}</option>

                            )}
            </Input>
          </FormGroup>
        </Col>

            <Col className="pl-md-1" md="3">
             <FormGroup>
               <label>Persona asignada</label>
               <Input value={taskDetails.persona_asignada.resourceID} type="select" name="selectLeader" id="leader" required onChange={handleSelectPersonaAsignada}>
                                {/* <option value={taskDetails.persona_asignada.resourceID} key={taskDetails.persona_asignada.resourceID}>{taskDetails.persona_asignada.name} {taskDetails.persona_asignada.surname}</option> */}
                               
                                {resources.map((resource) =>
                                   <option value={resource.resourceID} key={resource.resourceID}>{resource.name} {resource.surname}</option>
                                )}
               </Input>
             </FormGroup>
           </Col>
           <Col className="px-md-1" md="3">
            <FormGroup>
              <label>Estado</label>
              <Input value={taskDetails.estado} type="select" name="estado" id="estado" required onChange={handleEditTaskDetails}>
                             <option key={1} value="Iniciado">Iniciado</option>
                             <option key={2} value="No Iniciado">No Iniciado</option>
                             <option key={3} value="Terminado">Terminado</option>

              </Input>
            </FormGroup>
        </Col>

        
          
          {/* <label>Fecha Inicio</label>
          <DatePicker value={fechas.fecha_inicio} name="fecha_inicio" onChange={ e => handleChangeFecha({fecha: e, name:"fecha_inicio"})}/>

          <label>Fecha Limite Inicio</label>
          <DatePicker value={fechas.fecha_limite_inicio} name="fecha_limite_inicio" onChange={ e => handleChangeFecha({fecha: e, name:"fecha_limite_inicio"})}/>

          <label>Fecha Estimada Fin</label>
          <DatePicker value={fechas.fecha_estimada_fin} name="fecha_estimada_fin" onChange={ e => handleChangeFecha({fecha: e, name:"fecha_estimada_fin"})}/> */}

        </Row>
        <Row>
            <Col className="px-md-1" md="12">
                <FormGroup>
                    <label>Descripcion</label>
                    <Input
                    value={taskDetails.descripcion}
                    name="descripcion"
                    onChange={handleEditTaskDetails}
                    placeholder="descripcion"
                    type="text"
                    />
                </FormGroup>
            </Col>
        </Row>

        <Row>
            <Col className="pl-md-1" md="4">
            <FormGroup>
                <label>Ticket a los que pertenece</label>
                <Input  type="select" name="selectProjects" id="project" required onChange={handleSelectTicket}>
                                <option>-</option>
                                {tickets.map((ticket) => 
                                    <option value={ticket.ticketNumber} id={ticket.ticketNumber} key={ticket.ticketNumber}>{ticket.title}</option>
                                )}
                </Input>
                {taskDetails.tickets.map(ticket => (<li key={ticket.ticketNumber}>{ticket.title}</li>)) }

            </FormGroup>
            </Col>
            <Col className="pl-md-1" md="2">
          <div>
            <label>Fecha Inicio</label>
          </div>
          <DatePicker value={fechas.fecha_inicio} name="fecha_inicio" onChange={ e => handleChangeFecha({fecha: e, name:"fecha_inicio"})}/>
        </Col>
                             
        <Col className="pl-md-1" md="2">
          <div>
            <label>Fecha Fin</label>
          </div>
          <DatePicker value={fechas.fecha_fin} name="fecha_fin" onChange={ e => handleChangeFecha({fecha: e, name:"fecha_fin"})}/>
        </Col>
        </Row>

      <Button className="pull-right" onClick={submitCreateTask}>Actualizar</Button>
    </div>
  )
}

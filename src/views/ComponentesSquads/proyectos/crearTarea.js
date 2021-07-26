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


const sampleTask = {
  "nombre": "string",
  "descripcion": "string",
  "id_proyecto_asociado": 0,
  "persona_asignada": {
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
          if(match.params.id) {
            console.log(match.params.id)
            let ticketRecibido = result.filter(t => (t.ticketNumber == match.params.id))
            // console.log(newTicket)
            let newTickets = [...taskDetails.tickets, ...ticketRecibido]
        
            let newTaskDetails = {...taskDetails, tickets: newTickets}
            setTaskDetails(newTaskDetails)
          }
          // console.log(result)
        },
        (error) => {
          console.log("hubo error")
        }
      )
    projectService.getResources()
      .then(res => res.json())
      .then(
        (result) => {
          setResources(result)
          // console.log(result)
        },
        (error) => {
          console.log("hubo error")
        }
      )
      projectService.getProjects()
      .then(res => res.json())
      .then(
        (result) => {
          setProjects(result)
          // console.log(result)
        },
        (error) => {
          console.log("hubo error")
        }
      )
  }, [])

  function handleEditTaskDetails(e) {
    // console.log(e.target.id, e.target.value)
    let newTaskDetails = { ...taskDetails }
    newTaskDetails[e.target.name] = e.target.value
    setTaskDetails(newTaskDetails)
  }

  function handleSelectPersonaAsignada(e) {
    // console.log(e.target.value )
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
    // console.log(e.target.value)
    let newTicket = tickets.filter(t => (t.ticketNumber == e.target.value))
    // console.log(newTicket)
    let newTickets = [...taskDetails.tickets, ...newTicket]

    let newTaskDetails = {...taskDetails, tickets: newTickets}
    setTaskDetails(newTaskDetails)
  }

  function handleChangeFecha(e) {
    let newFechas = {...fechas}
    newFechas[e.name] = e.fecha
    setFechas(newFechas)
    let newTaskDetails = { ...taskDetails }
    newTaskDetails[e.name] = e.fecha.toLocaleDateString()
    setTaskDetails(newTaskDetails)
  }

  function submitCreateTask() {
    projectService.postTask(taskDetails).then(res => res.json()).then(
      (result) => {
        console.log("se creo la tarea",   result)
        taskDetails.tickets.map(t => {
          projectService.linkTaskAndTicket(t.ticketNumber, result).then(
            (result1) => {
              console.log("se linkeo la tarea", result ," al ticket", t.ticketNumber, ":", result1)
            },
            (error) => {
              console.log("hubo error", error)
            }
          )
        })
        window.location.replace("/admin/tareas");
      },
      (error) => {
        console.log("hubo error")
      }
    )
    
  }

//   function handleChangeFecha(e) {
//     console.log(e)
//     let newFechas = {...fechas}
//     newFechas[e.name] = e.fecha
//     setFechas(newFechas)
//     let newProjectDetails = { ...projectDetails }
//     newProjectDetails[e.name] = e.fecha.toLocaleDateString()
//     setProjectDetails(newProjectDetails)
//   }

  //   this.setState(
  //     {
  //       horarios: horariosDisponibles
  //     });

  //   }

  return (
    <div className="content">
      <h1>Crear tarea</h1>
      <Row>
        <Col className="px-md-1" md="4">
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

        <Col className="pl-md-1" md="4">
          <FormGroup>
            <label>Proyecto al que pertenece</label>
            <Input value={taskDetails.id_proyecto_asociado}  type="select" name="selectProjects" id="project" required onChange={handleSelectProject}>
                            {!taskDetails.id_proyecto_asociado && (<option>-</option>)}
                            {projects.map((project) =>
                                <option value={project.id} key={project.id}>{project.nombre}</option>

                            )}
            </Input>
          </FormGroup>
        </Col>
        <Col className="pl-md-1" md="4">
             <FormGroup>
               <label>Persona asignada</label>
               <Input value={taskDetails.persona_asignada.resourceID} type="select" name="selectLeader" id="leader" required onChange={handleSelectPersonaAsignada}>
                                {!taskDetails.persona_asignada.resourceID && (<option>-</option>)}
                                {/* <option value={taskDetails.persona_asignada.resourceID} key={taskDetails.persona_asignada.resourceID}>{taskDetails.persona_asignada.name} {taskDetails.persona_asignada.surname}</option> */}
                               
                                {resources.map((resource) =>
                                   <option value={resource.resourceID} key={resource.resourceID}>{resource.name} {resource.surname}</option>
                                )}
               </Input>
             </FormGroup>
        </Col>
      
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
                            
        </Row>

      <Button className="pull-right" onClick={submitCreateTask}>+ Crear</Button>
    </div>
  )
}

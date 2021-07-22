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

const sampleProject = {
  "nombre": "salir 2dos",
  "lider_de_equipo": {
    "legajo": 4,
    "Nombre": "Roman",
    "Apellido": "Riquelme"
  },
  "personas_asignadas": [],
  fecha_inicio: (new Date()).toLocaleDateString(),
  fecha_limite_inicio: (new Date()).toLocaleDateString(),
  fecha_estimada_fin: (new Date()).toLocaleDateString()

}

// 
const sampleLeaders= [{"legajo":7,"Nombre":"Alberto","Apellido":"Fernandez"}, {"legajo":1,"Nombre":"Camilo","Apellido":"Antonio"},{"legajo":2,"Nombre":"Maria","Apellido":"Perez"},{"legajo":3,"Nombre":"Patricia","Apellido":"Gaona"}]
const samplePersonas= [{"legajo":7,"Nombre":"Franco","Apellido":""}, {"legajo":1,"Nombre":"Camilo","Apellido":"Antonio"} ,{"legajo":2,"Nombre":"Lucia","Apellido":"Kasman"},{"legajo":3,"Nombre":"Agustina","Apellido":"Varela"}]


export default function CrearProyecto() {
  const [projectDetails, setProjectDetails] = useState(sampleProject)
  const [resources, setResources] = useState(sampleLeaders)
  const [personas, setPersonas] = useState(samplePersonas)

  const [fechas, setFechas] = useState({fecha_estimada_fin: new Date(), fecha_limite_inicio: new Date(), fecha_inicio: new Date()})

  useEffect(() => {
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
  }, [])

  function handleEditProjectDetails(e) {
    console.log(e)
    let newProjectDetails = { ...projectDetails }
    newProjectDetails[e.target.name] = e.target.value
    setProjectDetails(newProjectDetails)
  }

  function handleSelectTeamLeader(e) {
    console.log(e.target.value )
    let newProjectDetails = { ...projectDetails }
    
    newProjectDetails.lider_de_equipo = resources.filter(r => r.legajo == e.target.value)[0]
    setProjectDetails(newProjectDetails)
  }

  function handleSelectPersonaAsginada(e) {
    console.log(e.target.value )
    let newProjectDetails = { ...projectDetails }
    
    newProjectDetails.personas_asignadas.push(personas.filter(r => r.legajo == e.target.value)[0])
    setProjectDetails(newProjectDetails)
  }

  function submitCreateProject() {
    projectService.postProject(projectDetails).then(res => res.json()).then(
      (result) => {
        console.log(result)
        window.location.replace("/admin/proyectos");
      },
      (error) => {
        console.log("hubo error bro")
      }
    )
  }

  function handleChangeFecha(e) {
    console.log(e)
    let newFechas = {...fechas}
    newFechas[e.name] = e.fecha
    setFechas(newFechas)
    let newProjectDetails = { ...projectDetails }
    newProjectDetails[e.name] = e.fecha.toLocaleDateString()
    setProjectDetails(newProjectDetails)
  }

  //   this.setState(
  //     {
  //       horarios: horariosDisponibles
  //     });

  //   }

  return (
    <div className="content">
      <h1>Nuevo Proyecto</h1>
      <Row>
        <Col className="px-md-1" md="4">
          <FormGroup>
            <label>Nombre</label>
            <Input
              defaultValue={projectDetails.nombre}
              name="nombre"
              onChange={handleEditProjectDetails}
              placeholder="Nombre"
              type="text"
            />
          </FormGroup>
        </Col>
        <Col className="pl-md-1" md="4">
          <FormGroup>
            <label>Lider de Equipo</label>
            <Input value={projectDetails.lider_de_equipo.id} type="select" name="selectLeader" id="leader" required onChange={handleSelectTeamLeader}>
                            {resources.map((leader) =>
                                <option value={leader.legajo} key={leader.legajo}>{leader.Nombre} {leader.Apellido}</option>
                            )}
            </Input>
          </FormGroup>
        </Col>

        <Col className="pl-md-1" md="4">
          <FormGroup>
            <label>Personas asignadas</label>
            <Input  type="select" name="selectLeader" id="leader" required onChange={handleSelectPersonaAsginada}>
                            {personas.map((persona) =>
                                <option value={persona.legajo} key={persona.legajo}>{persona.Nombre} {persona.Apellido}</option>
                            )}
            </Input>
          </FormGroup>
        </Col>
          
          <label>Fecha Inicio</label>
          <DatePicker value={fechas.fecha_inicio} name="fecha_inicio" onChange={ e => handleChangeFecha({fecha: e, name:"fecha_inicio"})}/>

          <label>Fecha Limite Inicio</label>
          <DatePicker value={fechas.fecha_limite_inicio} name="fecha_limite_inicio" onChange={ e => handleChangeFecha({fecha: e, name:"fecha_limite_inicio"})}/>

          <label>Fecha Estimada Fin</label>
          <DatePicker value={fechas.fecha_estimada_fin} name="fecha_estimada_fin" onChange={ e => handleChangeFecha({fecha: e, name:"fecha_estimada_fin"})}/>

      </Row>
      <Button onClick={submitCreateProject}>+ Crear</Button>
    </div>
  )
}

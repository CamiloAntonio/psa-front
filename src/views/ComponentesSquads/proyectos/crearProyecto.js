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
  "nombre": "",
  "lider_de_equipo": {
    "legajo": undefined,
    "Nombre": undefined,
    "Apellido": undefined
  },
  "descripcion": "",
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
  const [resources, setResources] = useState([])

  // const [personas, setPersonas] = useState([])

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
    
    newProjectDetails.lider_de_equipo = resources.filter(r => r.resourceID == e.target.value)[0]
    setProjectDetails(newProjectDetails)
  }

  function handleSelectPersonaAsginada(e) {
    console.log(e.target.value )
    let newProjectDetails = { ...projectDetails }
    
    newProjectDetails.personas_asignadas.push(resources.filter(r => r.resourceID == e.target.value)[0])

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
                            {!projectDetails.lider_de_equipo.resourceID && (<option>-</option>)}
                            {resources.map((leader) =>
                                <option value={leader.resourceID} key={leader.resourceID}>{leader.name} {leader.surname}</option>
                            )}
            </Input>
          </FormGroup>
        </Col>

         </Row>
       
          

         <Row>

        <Col className="pl-md-1" md="2">
          <div>
            <label>Fecha Inicio</label>
          </div>
          <DatePicker value={fechas.fecha_inicio} name="fecha_inicio" onChange={ e => handleChangeFecha({fecha: e, name:"fecha_inicio"})}/>
        </Col>
                             
        <Col className="pl-md-1" md="2">
          <div>                 
            <label>Fecha Limite Inicio</label>
          </div>
          <DatePicker value={fechas.fecha_limite_inicio} name="fecha_limite_inicio" onChange={ e => handleChangeFecha({fecha: e, name:"fecha_limite_inicio"})}/>
        </Col>
        <Col className="pl-md-1" md="4">
          <div>
            <label>Fecha Estimada Fin</label>
          </div>
          <DatePicker value={fechas.fecha_estimada_fin} name="fecha_estimada_fin" onChange={ e => handleChangeFecha({fecha: e, name:"fecha_estimada_fin"})}/>
        </Col>
        </Row>


        <Row>
          <Col className="px-md-1" md="12">
            <FormGroup>
              <label>Descripcion</label>
              <Input
                defaultValue={projectDetails.descripcion}
                name="descripcion"
                onChange={handleEditProjectDetails}
                placeholder="Descripcion"
                type="text"
              />
            </FormGroup>
          </Col>
        </Row>

          <Row>
            <Col className="pl-md-1" md="4">
              <FormGroup>
                <label>Personas asignadas</label>
                <Input  type="select" name="selectLeader" id="leader" required onChange={handleSelectPersonaAsginada}>
                                {projectDetails.personas_asignadas.length==0 && (<option>-</option>)}
                                {resources.map((resource) =>
                                    <option value={resource.resourceID} key={resource.resourceID}>{resource.name} {resource.surname}</option>
                                )}
                </Input>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col className="pl-md-1" md="4">
              {projectDetails.personas_asignadas.map(resource => (<li key={resource.resourceID}>{resource.name} {resource.surname}</li>)) }
            </Col>
          
          <Col className="pl-md-1" md="8">
          <Button className="pull-right" onClick={submitCreateProject}>+ Crear</Button>
          </Col>
          </Row>

        {/* <Row>
          <Col className="pl-md-1" md="4">
          {projectDetails.personas_asignadas.map(resource => (<li key={resource.resourceID}>{resource.name} {resource.surnname}</li>)) }
          </Col>
        </Row> */}

    </div>
  )
}

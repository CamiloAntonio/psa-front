import React from 'react'
import { useState, useEffect } from 'react'
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


const sampleProj = {
    "nombre": "string",
    "lider_de_equipo": {
      "legajo": 0,
      "Nombre": "string",
      "Apellido": "string"
    },
    "personas_asignadas": [
      {
        "legajo": 0,
        "Nombre": "string",
        "Apellido": "string"
      }
    ],
    "fecha_inicio": "string",
    "fecha_limite_inicio": "string",
    "fecha_estimada_fin": "string",
    "estado": "No Iniciado",
    "porcentaje_de_avance": 0,
    "fecha_fin": "",
    "id": 0
  }

export default function Proyecto({match}) {
    const [projectDetails, setProjectDetails] = useState(sampleProj)
    const [resources, setResources] = useState([])
    const [fechas, setFechas] = useState({fecha_estimada_fin: new Date(), fecha_limite_inicio: new Date(), fecha_inicio: new Date()})


    function handleEditProjectDetails(e) {
      // console.log(e)
      let newProjectDetails = { ...projectDetails }
      newProjectDetails[e.target.name] = e.target.value
      setProjectDetails(newProjectDetails)
    }
  
    function handleSelectTeamLeader(e) {
      // console.log(e.target.value )
      let newProjectDetails = { ...projectDetails }
      
      newProjectDetails.lider_de_equipo = resources.filter(r => r.resourceID == e.target.value)[0]
      setProjectDetails(newProjectDetails)
    }
  
    function handleSelectPersonaAsginada(e) {
      if(e.target.value == "nulo"){ return }  
      // console.log(e.target.value )
      let newProjectDetails = { ...projectDetails }
      
      newProjectDetails.personas_asignadas.push(resources.filter(r => r.resourceID == e.target.value)[0])
  
      setProjectDetails(newProjectDetails)
    }
  
    function submitCreateProject() {
      projectService.postProject(projectDetails).then(res => res.json()).then(
        (result) => {
          // console.log(result)
          window.location.replace("/admin/proyectos");
        },
        (error) => {
          console.log("hubo error bro")
        }
      )
    }
  
    function handleChangeFecha(e) {
      // console.log(e)
      let newFechas = {...fechas}
      newFechas[e.name] = e.fecha
      setFechas(newFechas)
      let newProjectDetails = { ...projectDetails }
      newProjectDetails[e.name] = e.fecha.toLocaleDateString()
      setProjectDetails(newProjectDetails)
    }


    useEffect(() => {
        projectService.getProjectById(match.params.id)
            .then(res => res.json())
            .then(
                (result) => {
                    setProjectDetails(result)
                    let newFechas = {...fechas}
                    
                    newFechas.fecha_estimada_fin = new Date(result.fecha_estimada_fin)
                    newFechas.fecha_limite_inicio = new Date(result.fecha_limite_inicio)
                    newFechas.fecha_inicio = new Date(result.fecha_inicio)
                    console.log("fechas trnasformadas", newFechas)
                    setFechas(newFechas)


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

    }, [])
  
    return (
      <div className="content">
      <h1>{projectDetails.nombre}</h1>
      <Row>
        <Col className="px-md-1" md="4">
          <FormGroup>
            <label>Nombre</label>
            <Input
              value={projectDetails.nombre}
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
            <Input value={projectDetails.lider_de_equipo.name} type="select" name="selectLeader" id="leader" required onChange={handleSelectTeamLeader}>
                             <option>{projectDetails.lider_de_equipo.name} {projectDetails.lider_de_equipo.surname}</option>
                            {resources.map((leader) =>
                                <option value={leader.resourceID} key={leader.resourceID}>{leader.name} {leader.surname}</option>
                            )}
            </Input>
          </FormGroup>
        </Col>

        <Col className="pl-md-1" md="4">
          <FormGroup>
            <label>Personas asignadas</label>
            <Input  type="select" name="selectLeader" id="leader" required onChange={handleSelectPersonaAsginada}>
                            { (<option value="nulo">-</option>)}
                            {resources.map((resource) =>
                                <option value={resource.resourceID} key={resource.resourceID}>{resource.name} {resource.surname}</option>
                            )}
            </Input>
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
        <Col className="pl-md-1" md="4">
          {projectDetails.personas_asignadas.map(resource => (<li key={resource.resourceID}>{resource.name} {resource.surnname}</li>)) }
        </Col>

        </Row>

         <Row>
        
        </Row>

        {/* <Row>
          <Col className="pl-md-1" md="4">
          {projectDetails.personas_asignadas.map(resource => (<li key={resource.resourceID}>{resource.name} {resource.surnname}</li>)) }
          </Col>
        </Row> */}

      <Button onClick={submitCreateProject}>+ Crear</Button>
    </div>
    )
}

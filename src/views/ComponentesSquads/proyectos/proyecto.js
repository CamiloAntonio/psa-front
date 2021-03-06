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
import { Link } from 'react-router-dom';

const sampleProj = {
    "nombre": "",
    "lider_de_equipo": {
      "legajo": 0,
      "Nombre": "",
      "Apellido": ""
    },
    "personas_asignadas": [
      {
        "legajo": 0,
        "Nombre": "",
        "Apellido": ""
      }
    ],
    "fecha_inicio": "string",
    "fecha_limite_inicio": "string",
    "fecha_estimada_fin": "string",
    "estado": "No Iniciado",
    "porcentaje_de_avance": 0,
    "fecha_fin": "",
    "id": 0,
    "tareas": []
  }

export default function Proyecto({match}) {
    const [projectDetails, setProjectDetails] = useState(sampleProj)
    const [resources, setResources] = useState([])
    const [fechas, setFechas] = useState({fecha_estimada_fin: new Date(), fecha_limite_inicio: new Date(), fecha_inicio: new Date(), fecha_fin: undefined})


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
  
    function submitUpdateProject() {
      projectService.updateProject(projectDetails).then(res => res.json()).then(
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
                    if(result.fecha_fin.length>0) newFechas.fecha_fin = new Date(result.fecha_fin)

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

        <Col className="px-md-1" md="2">
            <FormGroup>
              <label>Estado</label>
              <Input value={projectDetails.estado} type="select" name="estado" id="estado" required onChange={handleEditProjectDetails}>
                             <option key={1} value="Iniciado">Iniciado</option>
                             <option key={2} value="No Iniciado">No Iniciado</option>
                             <option key={3} value="Terminado">Terminado</option>

              </Input>
            </FormGroup>
        </Col>
        <Col className="px-md-1" md="2">
          <FormGroup>
            <label>Porcentaje de avance</label>
            <Input
              value={projectDetails.porcentaje_de_avance}
              name="porcentaje_de_avance"
              onChange={handleEditProjectDetails}
              placeholder="Avance"
              type="number"
            />
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
        <Col className="pl-md-1" md="2">
          <div>
            <label>Fecha Estimada Fin</label>
          </div>
          <DatePicker value={fechas.fecha_estimada_fin} name="fecha_estimada_fin" onChange={ e => handleChangeFecha({fecha: e, name:"fecha_estimada_fin"})}/>
        </Col>
        <Col className="pl-md-1" md="2">
          <div>
            <label>Fecha Fin</label>
          </div>
          <DatePicker value={fechas.fecha_fin} name="fecha_fin" onChange={ e => handleChangeFecha({fecha: e, name:"fecha_fin"})}/>
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
          <Col className="pl-md-1" md="4  ">
            <FormGroup>
              <label>Personas asignadas</label>
              <Input  type="select" name="selectLeader" id="leader" required onChange={handleSelectPersonaAsginada}>
                              {(<option value="nulo">-</option>)}
                              {resources.map((resource) =>
                                  <option value={resource.resourceID} key={resource.resourceID}>{resource.name} {resource.surname}</option>
                              )}
              </Input>
            </FormGroup>
            {projectDetails.personas_asignadas.map(resource => (<li key={resource.resourceID}>{resource.name} {resource.surname}<Button size="sm" onClick={() => {setProjectDetails({...projectDetails, personas_asignadas: projectDetails.personas_asignadas.filter(p => p.resourceID !== resource.resourceID)})}}>x</Button></li>)) }
          </Col>
          <Col className="pl-md-1" md="4">
          <label>Tareas</label>
            {projectDetails.tareas.map(tarea => (<li key={tarea.id}><Link to={`/admin/tarea/${tarea.id}`} style={{ 'color': 'inherit' }}>{tarea.nombre}</Link></li>)) }
          </Col>
        <Col className="pl-md-1" md="4">
        <Button className="pull-right" onClick={submitUpdateProject}>Actualizar</Button>
        </Col>
        
        </Row>

        <Row>        
        </Row>

    </div>
    )
}

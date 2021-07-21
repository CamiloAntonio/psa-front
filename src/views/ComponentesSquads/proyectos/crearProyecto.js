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
  "personas_asignadas": [
    {
      "legajo": 0,
      "Nombre": "string",
      "Apellido": "string"
    }
  ],
  fecha_inicio: (new Date()).toLocaleDateString(),
  fecha_limite_inicio: (new Date()).toLocaleDateString(),
  fecha_estimada_fin: (new Date()).toLocaleDateString()

}

// 
const sampleLeaders= [{"legajo":1,"Nombre":"Mario","Apellido":"Mendoza"},{"legajo":2,"Nombre":"Maria","Apellido":"Perez"},{"legajo":3,"Nombre":"Patricia","Apellido":"Gaona"}]

export default function CrearProyecto() {
  const [projectDetails, setProjectDetails] = useState(sampleProject)
  const [resources, setResources] = useState(sampleLeaders)
  const [fecha, setFecha] = useState(new Date())

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

  function submitCreateProject() {
    console.log("se toco el boton")
    projectService.postProject(projectDetails)
    window.location.replace("/proyectos");
  }

  function handleChangeFecha(e) {
    console.log(e)
    setFecha(e)
    let newProjectDetails = { ...projectDetails }
    newProjectDetails.fecha_inicio = e.toLocaleDateString()
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

          <DatePicker value={fecha} name="fecha" onChange={handleChangeFecha}/>

        </Col>
      </Row>
      <Button onClick={submitCreateProject}>+ Crear</Button>
    </div>
  )
}

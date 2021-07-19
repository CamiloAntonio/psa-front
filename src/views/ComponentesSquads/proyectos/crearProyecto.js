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

const sampleProject = {
  "nombre": "salir campeones",
  "lider_de_equipo": {
    "id": 33,
    "name": "Mascherano"
  },
  "personas_asignadas": [
    {
      "id": 0,
      "name": ""
    }
  ]
}

export default function CrearProyecto() {
  const [projectDetails, setProjectDetails] = useState(sampleProject)
  const [resources, setResources] = useState([])

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

  function handleEditTeamLeader(e) {
    let newProjectDetails = { ...projectDetails }
    newProjectDetails.lider_de_equipo.id = e.target.value
    setProjectDetails(newProjectDetails)
  }

  function submitCreateProject() {
    console.log("se toco el boton")
    projectService.postProject(projectDetails)
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
            <Input
              placeholder="Lider"
              type="number"
              defaultValue={projectDetails.lider_de_equipo.name}
              name="lider_de_equipo"
              onChange={handleEditTeamLeader}
            />
          </FormGroup>
        </Col>
      </Row>
      <Button onClick={submitCreateProject}>+ Crear</Button>
    </div>
  )
}

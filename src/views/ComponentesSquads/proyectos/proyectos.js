import React from 'react'
import projectService from 'services/project.service'
import { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';


const proyects = [{ id: undefined, nombre: "", lider_de_equipo: { name: "", id: undefined } }]

export default function Proyectos() {
  const [proyectos, setProyectos] = useState([])

  useEffect(() => {
    projectService.getProjects()
      .then(res => res.json())
      .then(
        (result) => {
          setProyectos(result)
          console.log(result)
        },
        (error) => {
          console.log("hubo error bro")
        }
      )
  }, [])


  function handleDeleteProject(e){
    if (window.confirm(
      `¿Estás seguro que querés borrar este proyecto?` +
      "\n¡Esta acción no se podrá deshacer!")) {

        projectService.deleteProjectById(e.target.value)
        .then(res => res.json())
        .then(
          (result) => {
            window.location.reload()
            console.log(result)
          },
          (error) => {
            console.log("hubo error bro")
          }
        )
    }
  }


  return (
    <div className="content">
      <h1>Proyectos</h1>
      <Link to={"/admin/crear-proyecto/"} style={{ 'color': 'inherit' }}><Button>Crear proyecto</Button></Link>
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Lider de equipo</th>
            <th>Fecha Inicio</th>
            <th>Fecha Limite Inicio</th>
            <th>Fecha Estimada Fin</th>
            <th>Fecha Fin</th>
            <th>Estado</th>
            <th>Porcentaje de avance</th>




          </tr>
        </thead>
        {proyectos && proyectos.map(proyecto => (
          <tbody>
            <tr>
              <Link to={`proyecto/${proyecto.id}`} style={{ 'color': 'inherit' }}>
                <td>{proyecto.nombre}</td>
              </Link>
              <td>{proyecto.lider_de_equipo.name} {proyecto.lider_de_equipo.surname}</td>
              <td>{proyecto.fecha_inicio}</td>
              <td>{proyecto.fecha_limite_inicio}</td>
              <td>{proyecto.fecha_estimada_fin}</td>
              <td>{proyecto.fecha_fin}</td>
              <td>{proyecto.estado}</td>
              <td>{proyecto.porcentaje_de_avance}</td>





              <Button color="danger" onClick={handleDeleteProject} value={proyecto.id} size="sm"> Borrar </Button>
            </tr>
          </tbody>
        ))}
      </Table>
    </div >
  )
}

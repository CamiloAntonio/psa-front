import React from 'react'
import projectService from 'services/project.service'
import { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';


const proyects = [{ id: undefined, nombre: "", lider_de_equipo: { name: "", id: undefined } }]

export default function Proyectos() {
  const [proyectos, setProyectos] = useState(proyects)

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
    console.log("la key es esta", e.target.value)
    projectService.deleteProjectById(e.target.value)
  }


  return (
    <div className="content">
      <h1>Proyectos</h1>
      <Link to={"/admin/crear-proyecto/"} style={{ 'color': 'inherit' }}><Button>Crear proyecto</Button> </Link>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Lider de equipo</th>
            <th>Fecha Inicio</th>
            <th>Fecha Limite Inicio</th>
            <th>Fecha Estimada Fin</th>
            <th>Fecha Fin</th>
            <th>Estado</th>



          </tr>
        </thead>
        {proyectos && proyectos.map(proyecto => (
          <tbody>
            <tr>

              <th scope="row">{proyecto.id}</th>
              <Link to={`proyecto/${proyecto.id}`} style={{ 'color': 'inherit' }}>
                <td>{proyecto.nombre}</td>
              </Link>
              <td>{proyecto.lider_de_equipo.Nombre} {proyecto.lider_de_equipo.Apellido}</td>
              <td>{proyecto.fecha_inicio}</td>
              <td>{proyecto.fecha_limite_inicio}</td>
              <td>{proyecto.fecha_estimada_fin}</td>
              <td>{proyecto.fecha_fin}</td>
              <td>{proyecto.estado}</td>




              <Button onClick={handleDeleteProject} value={proyecto.id}> Borrar </Button>
            </tr>
          </tbody>
        ))}
      </Table>
    </div >
  )
}

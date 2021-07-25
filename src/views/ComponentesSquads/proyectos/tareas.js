import React from 'react'
import projectService from 'services/project.service'
import { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
    


const tasks = [{"name":"lavar el auto","description":"franco tiene que lavar el auto","associated_project_id":0,"assigned_worker":{"legajo":0,"Nombre":"string","Apellido":"string"},"id":37795658689678337769717990116820166939,"status":"No Iniciado"}]

export default function Tareas() {
    const [tareas, setTareas] = useState(tasks)
    const [proyectos, setProyectos] = useState([])

    useEffect(() => {
        projectService.getTasks()
          .then(res => res.json())
          .then(
            (result) => {
                setTareas(result)
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
                setProyectos(result)
              console.log(result)
            },
            (error) => {
              console.log("hubo error bro")
            }
          )
      }, [])
    



    // useEffect(() => {
    //     projectService.getProjects().then(      
    //       response => {
    //         console.log(response.data);
    //         // setTurnos(response.data);        
    //       },
    //       error => {
    //         console.log('ocurrio un error');
    //         const resMessage =
    //           (error.response &&
    //             error.response.data &&
    //             error.response.data.message) ||
    //           error.message ||
    //           error.toString();
    //       }
    //     );
    //   }, []);

    return (
        <div className="content">
            <h1>Tareas</h1>
            <Link to={"/admin/crear-tarea/"} style={{ 'color': 'inherit' }}><Button>Crear tarea</Button></Link>
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Proyecto</th>
                        <th>Descripcion</th>
                        <th>Persona Asignada</th>
                        <th>Fecha Inicio</th>
                    </tr>
                </thead>
                {tareas.map(tarea => (
                    <tbody>
                        <tr>
                            <td>
                            <Link to={`tarea/${tarea.id}`} style={{ 'color': 'inherit' }}>
                              {tarea.nombre}
                            </Link>
                            </td>
                            {proyectos && tarea &&
                              <td scope="row">
                            <Link to={`proyecto/${tarea.id_proyecto_asociado}`} style={{ 'color': 'inherit' }}>
                                {proyectos.filter(p => p.id == tarea.id_proyecto_asociado)[0] && proyectos.filter(p => p.id == tarea.id_proyecto_asociado)[0].nombre}
                            </Link>
                              </td>}
                            <td>{tarea.description}</td>
                            {tarea.assigned_worker ? <td>{tarea.assigned_worker.Nombre} {tarea.assigned_worker.Apellido}</td> : <td>No asignada</td>}
                            <td>{tarea.fecha_inicio}</td>

                        </tr>
                    </tbody>
                ))}
            </Table>
        </div>
    )
}

import React from 'react'
import projectService from 'services/project.service'
import { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
    


const tasks = [{"name":"lavar el auto","description":"franco tiene que lavar el auto","associated_project_id":0,"assigned_worker":{"legajo":0,"Nombre":"string","Apellido":"string"},"id":37795658689678337769717990116820166939,"status":"No Iniciado"}]

export default function Tareas() {
    const [tareas, setTareas] = useState([])
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

      function handleDeleteTask(e){
        if (window.confirm(
          `¿Estás seguro que querés borrar esta tarea?` +
          "\n¡Esta acción no se podrá deshacer!")) {
    
            projectService.deleteTaskById(e.target.value)
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
                        <th>Persona Asignada</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Estado</th>

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
                            {tarea.persona_asignada ? <td>{tarea.persona_asignada.name} {tarea.persona_asignada.surname}</td> : <td>No asignada</td>}
                            <td>{tarea.fecha_inicio}</td>
                            <td>{tarea.fecha_fin}</td>
                            <td>{tarea.estado}</td>

                            <td className="text-right">
                                <Link to={`hours/create/${tarea.id}`}>
                                  <Button color="info" size="sm">Cargas Horas</Button>
                                </Link>
                            </td>
                            <td>
                              <Button color="danger" onClick={handleDeleteTask} value={tarea.id} size="sm"> Borrar </Button>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </Table>
        </div>
    )
}

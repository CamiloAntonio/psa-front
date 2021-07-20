import React from 'react'
import projectService from 'services/project.service'
import { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';


const tasks = [{"name":"lavar el auto","description":"franco tiene que lavar el auto","associated_project_id":0,"assigned_worker":{"legajo":0,"Nombre":"string","Apellido":"string"},"id":37795658689678337769717990116820166939,"status":"No Iniciado"}]

export default function Tareas() {
    const [tareas, setTareas] = useState(tasks)

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
            <Button>Crear Tarea</Button>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Lider de equipo</th>
                    </tr>
                </thead>
                {tareas.map(tarea => (
                    <tbody>
                        <tr>
                            <th scope="row">22</th>
                            <td>{tarea.name}</td>
                            <td>{tarea.description}</td>
                            <td>{tarea.assigned_worker.Nombre} {tarea.assigned_worker.Apellido}</td>
                        </tr>
                    </tbody>
                ))}
            </Table>
        </div>
    )
}

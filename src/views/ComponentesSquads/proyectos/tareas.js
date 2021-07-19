import React from 'react'
import projectService from 'services/project.service'
import { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';


const proyects = [{ id: 1, nombre: "Ganar el mundial", lider_de_proyecto: "Messi" }]

export default function Tareas() {
    const [proyectos, setProyectos] = useState(proyects)

    useEffect(() => {
        fetch("https://modulo-proyectos.herokuapp.com/projects/")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                },
                (error) => {
                    console.log("hubo error man")
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
            <Button>Crear proyecto</Button>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Lider de equipo</th>
                    </tr>
                </thead>
                {proyectos.map(proyecto => (
                    <tbody>
                        <tr>
                            <th scope="row">22</th>
                            <td>{proyecto.nombre}</td>
                            <td>Lionel Messi</td>
                        </tr>
                    </tbody>
                ))}
                <tbody>
                    <tr>
                        <th scope="row">22</th>
                        <td>Ganar la copa</td>
                        <td>Lionel Messi</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

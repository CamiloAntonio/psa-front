import React from 'react'
import { useState, useEffect } from 'react'
import projectService from 'services/project.service'

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
    const [proyecto, setProyecto] = useState(sampleProj)

    useEffect(() => {
        projectService.getProjectById(match.params.id)
            .then(res => res.json())
            .then(
                (result) => {
                    setProyecto(result)
                    console.log(result)
                },
                (error) => {
                    console.log("hubo error bro")
                }
            )
    }, [])
    return (
        <div className="content">
          <tbody>
            <tr>{proyecto.nombre}</tr>
            <tr>{proyecto.fecha_inicio}</tr>
            <tr>{proyecto.estado}</tr>
            {proyecto.personas_asignadas.map( persona => (<li>{persona.Nombre}</li>))}
          </tbody>  
        </div>
    )
}

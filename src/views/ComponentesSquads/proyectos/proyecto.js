import React from 'react'
import { useState, useEffect } from 'react'
import projectService from 'services/project.service'
export default function Proyecto({match}) {
    const [proyecto, setProyecto] = useState({})

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
            {proyecto.nombre}
        </div>
    )
}

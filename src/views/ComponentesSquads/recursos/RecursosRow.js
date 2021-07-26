import React from 'react'

export default function RecursosRow({data}) {
    return (
        <tr>
            <th scope="row">{data.resourceID}</th>
            <td>{data.name}</td>
            <td>{data.surname}</td>
        </tr>
    )
}
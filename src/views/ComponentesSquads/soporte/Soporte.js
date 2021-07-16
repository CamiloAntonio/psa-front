import React from 'react'
import { Table,Button } from 'reactstrap';


export default function Soporte() {
    const productos = [{
        nombre:"producto1",
        version:"1.0.0"
    },{
        nombre:"producto2",
        version:"1.2.0"
    },{
        nombre:"producto3",
        version:"2.0.0"
    }];
    

    return (
        <div className="content">
            <h1>Productos PSA</h1>


            {<Table responsive>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Version</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) =>
                        <tr>
                            <td>{producto.nombre}</td>
                            <td>{producto.version}</td>
                            <td className="text-right">
                                <Button className="btn-info" color="info" size="sm">
                                    {/*<i className="fa fa-user"></i>*/}
                                    Tickets
                                </Button>    
                            </td>
                        </tr>)}
                    
                </tbody>
            </Table>}

        </div>
    )
}

import { Button , FormGroup,
    Label,
    Input,
    Table
    } from 'reactstrap';

import { Link } from 'react-router-dom';


export default function Tickets() {
   

    return (
        <div className="content">
            <h1>Tickets</h1>
            <form>
                <FormGroup>
                    <Label for="exampleEmail">Ingrese Nro. Ticket</Label>
                    <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    />
                </FormGroup>
                <Button color="info" size="sm" type="submit">
                    Buscar
                </Button>
            </form>

            <hr color="#4c4c4c"></hr>
        
            <div className="text-left">
                <Link to="./creacion_ticket">
                    <Button className="primary" color="primary" size="sm">
                    <i className="tim-icons icon-simple-add"/>{" "}
                    Ticket
                    </Button>
                </Link>
            </div>

            <Table>
                <thead>
                    <tr>
                        <th>Nro Ticket</th>
                        <th>Titulo</th>
                        <th>Estado</th>
                        <th>Agente</th>
                        <th>Vencimiento</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>123</td>
                        <td>Falla al clickear boton de aceptar</td>
                        <td>Asignado</td>
                        <td>Franco Mariotti</td>
                        <td>24/04/2021</td>
                        <td className="text-right">
                            <Button className="primary" color="primary" size="sm">
                                <i className="tim-icons icon-simple-add"/>{" "}
                                Tarea
                            </Button>{` `}
                            <Button className="btn-icon" color="info" size="sm">
                                <i className="fa fa-edit"></i>
                            </Button>{` `}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

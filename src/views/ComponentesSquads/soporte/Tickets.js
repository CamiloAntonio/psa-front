import { Card, CardBody, CardTitle, CardText, Button , FormGroup,
    Label,
    Input,
    FormText} from 'reactstrap';

export default function Tickets() {
   

    return (
        <div className="content">
            <h1>Buscar ticket</h1>
            <form>
                <FormGroup>
                    <Label for="exampleEmail">Nro Ticket</Label>
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

            {<Card style={{width: '20rem'}}>

                <CardBody>
                    <CardTitle><h3>Estado: Asignado</h3></CardTitle>
                    <CardText>
                    <h4>Ticket nro: 123</h4>
                        <ul>
                            <li><h6>Titulo:</h6> Falla al clickear boton de aceptar</li>
                            <li><h6>Agente:</h6> Franco Mariotti</li>
                            <li><h6>Vencimiento:</h6> 24/04/2021</li>
                        </ul>
                    </CardText>

                    <div className="text-right">
                        <Button color="primary" size="sm">Editar</Button>
                        <Button color="primary" size="sm">Crear Tarea</Button>
                    </div>

                </CardBody>
            </Card>}
            <div className="text-right">
                <Button color="primary" type="submit">
                    Crear Ticket
                </Button>
            </div>
        </div>
    )
}

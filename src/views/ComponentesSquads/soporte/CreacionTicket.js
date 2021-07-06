import React from "react";

import {
    FormGroup,
    Label,
    Input,
    FormText,
    Button,
    Card,
    CardBody
} from "reactstrap";

const FormularioCreacion = () => {

    const severidades = [{nombre:"Alta"},
        {nombre:"Media"},
        {nombre:"Baja"}]

    const clientes = [{nombre:"Cliente1"},
        {nombre:"Cliente2"},
        {nombre:"CLiente3"}]

    const agentes = [{nombre:"Agente1"},
        {nombre:"Agente2"},
        {nombre:"Agente3"}]


    return (
        <Card>
            <CardBody>
                <form>
                    <FormGroup>
                        <Label for="titulo">Título *</Label>
                        <Input
                            type="text"
                            name="titulo"
                            id="titulo"
                            placeholder="Ingerese un título"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="severidad">Severidad *</Label>
                        <Input type="select" name="selectSeveridad" id="severidad" required>
                            <option value="" selected disabled hidden>Seleccione la severidad</option>
                            {severidades.map((severidad) =>
                                <option>{severidad.nombre}</option>
                            )}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="cliente">Cliente *</Label>
                        <Input type="select" name="selectCliente" id="cliente" required>
                            <option value="" selected disabled hidden>Seleccione el cliente al que quiera asociar el ticket</option>
                            {clientes.map((cliente) =>
                                <option>{cliente.nombre}</option>
                            )}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="agente">Agente</Label>
                        <Input type="select" name="selectAgente" id="agente">
                            <option value="" selected disabled hidden>Seleccione el agente al cual asignar el ticket</option>
                            {agentes.map((agente) =>
                                <option>{agente.nombre}</option>
                            )}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="descripcion">Descripción *</Label>
                        <Input
                            type="textarea"
                            name="descripcion"
                            id="descripcion"
                            placeholder="Ingrese una descripcion para el ticket"
                            required
                        />
                    </FormGroup>
                    <div className="text-right">
                        <Button color="info" type="submit">
                            Crear
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
};

export default function CreacionTicket() {

    const producto = {nombre:'Producto1',version:'1.2.3'}

    return (
         <div className="content">
             <h1>Creacion de ticket - {producto.nombre} - version: {producto.version}</h1>

             {FormularioCreacion()}

         </div>
    )
}



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

const FormularioEdicion = () => {

    const severidades = [{nombre:"S1 (7 dias para resolver)"},
        {nombre:"S2 (30 dias para resolver)"},
        {nombre:"S3 (90 dias para resolver)"},
        {nombre:"S4 (365 dias para resolver)"}]

    const clientes = [{nombre:"Cliente1"},
        {nombre:"Cliente2"},
        {nombre:"CLiente3"}]

    const agentes = [{nombre:"Sin asignar"},
        {nombre:"Agente1"},
        {nombre:"Agente2"},
        {nombre:"Agente3"}]

    const estados = [{nombre:"Nuevo"},
        {nombre:"En Progreso"},
        {nombre:"Terminado"},
        {nombre:"Bloqueado"}]


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
                            {agentes.map((agente) =>
                                <option>{agente.nombre}</option>
                            )}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="estado">Estado *</Label>
                        <Input type="select" name="selectEstado" id="estado">
                            <option value="" selected disabled hidden>Seleccione el estado del ticket</option>
                            {estados.map((estado) =>
                                <option>{estado.nombre}</option>
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
                        <Button color="primary" type="submit">
                            Confirmar cambios
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
};

export default function EdicionTicket() {

    const producto = {nombre:'Producto1',version:'1.2.3'}
    const tkt = {nro:100}

    return (
         <div className="content">
             <h1>Edicion Ticket #{tkt.nro} - {producto.nombre} - version: {producto.version}</h1>

             {FormularioEdicion()}

         </div>
    )
}
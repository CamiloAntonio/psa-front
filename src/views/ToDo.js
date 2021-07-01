
import React, { useState } from 'react';

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardText,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";

let lista_todos = [
    {id: 1, name: "sacar al perro", estado: false, fecha: new Date() },
    {id: 2, name: "lavar la ropa", estado: false, fecha: new Date() },
    {id: 3, name: "hacer la compras", estado: true, fecha: new Date() },
]


function ToDo() {

    const [todos, setTodos] = useState(lista_todos);

    function checkTodo(e){
        console.log(e.target)
        let todo_cambios = todos.map(todo => {
            if(todo.id === parseInt(e.target.name)){
                todo.estado = !todo.estado
            }
            return todo
        })

        setTodos(todo_cambios)
    }

    return (
        <>
            <div className="content">
                <div>Lista de todos</div>
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id}>
                            <label>
                                {todo.name}
                                <input
                                    
                                    name={todo.id}
                                    type="checkbox"
                                    checked={todo.estado}
                                    onChange={checkTodo} 
                                />
                            </label>
                        </li>

                    )

                    )}

                </ul>

            </div>
        </>
    );
}

export default ToDo;

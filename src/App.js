import React, {useState, useEffect, useReducer} from 'react'
import TodoList from './TodoList'
import {Context} from "./context";
import reducer from "./reducer";

export default function App() {

    // const [todos, setTodos] = useState([
    //     {id: 1, title: 'First todo', completed: false},
    //     {id: 2, title: 'Second todo', completed: true},
    // ]);

    // const [todos, setTodos] = useState([]);

    const [todoTitle, setTodoTitle] = useState('');
    const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('todos')));

    // const handler = () => {
    //     console.log('click')
    // };

    useEffect(() => { //use like componentDidMount, but in functional programming
        localStorage.setItem('todos', JSON.stringify(state));
    }, [state]);

    const addTodo = (event) => {
        if (event.key === 'Enter' && todoTitle !== '') {
            dispatch({
                type: 'ADD',
                payload: todoTitle
            });
            setTodoTitle('');
        }
    };

    // const removeTodo = (id) => { // remove todo
    //     setTodos(state.filter(todo => {
    //         return todo.id != id
    //     }))
    // };
    //
    // const toggleTodo = (id) => {// checked todo
    //     setTodos(state.map(todo => {
    //         if(todo.id === id){
    //             todo.completed = !todo.completed
    //         }
    //         return todo
    //     }))
    //
    // };

    return (
        <Context.Provider value={{
            // toggleTodo, removeTodo
            dispatch

        }}>
            <div className="container">
                <h1>Todo app</h1>

                <div className="input-field">
                    <input type="text"
                           value={todoTitle}
                           onChange={event => setTodoTitle(event.target.value)}
                           onKeyPress={addTodo}
                    />
                    <label>Todo name</label>
                </div>

                <TodoList todos={state}/>
            </div>
        </Context.Provider>
    );
}
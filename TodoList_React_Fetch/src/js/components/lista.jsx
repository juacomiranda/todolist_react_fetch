import React, {useEffect, useState} from "react";

export function List () {
    const [tarea, setTarea] = useState('');
    const [tareas, setTareas] = useState([]);
    const API_URL = "https://playground.4geeks.com/todo/users/juacomiranda";

    useEffect(() => {
        fetch('https://playground.4geeks.com/todo/users/juacomiranda')
        .then(response => response.json())
        .then(data => setTareas(data.todos))
    },[]);


    const agregarTarea = () => {
        if (tarea.trim() === '') return;


        fetch ('https://playground.4geeks.com/todo/todos/juacomiranda', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  },
            body: JSON.stringify({
                label: tarea,
                done: false
            })
        })
            .then(response => response.json())
            .then (nuevaTarea => {
                setTareas([...tareas, nuevaTarea]);
                setTarea('');
            })
            .catch (error => console.error(error));
        };

        
    

    const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      agregarTarea();
    }
    };

    const borrarTarea = (id) => {

    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE"
    })
        .then(() => {
            setTareas(tareas.filter(t => t.id !== id))
         });

};


    return (
        <div className="text-center">
            <div className="mt-5">
                <input 
                    type="text" 
                    className="form-control-lg" 
                    id="tarea_input" 
                    placeholder="Ingrese una tarea y presione Enter"
                    value={tarea}
                    onChange={(e) => setTarea(e.target.value)} 
                    onKeyDown={handleKeyDown}
               />
                <div className="container border mt-5 ">
                    <ul className="my-3 text-start">
                        {tareas.map((t, ) =>(
                            <li 
                                key={t.id}>{t.label}
                                <i className="fa-solid fa-trash-can" onClick={() => borrarTarea(t.id)} ></i>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
import React, {useEffect, useState} from "react";

export function List () {
    const [tarea, setTarea] = useState('');
    const [tareas, setTareas] = useState([]);

    const agregarTarea = () => {
        if (tarea.trim() === '') return;

        setTareas ([...tareas, tarea]);
        setTarea ('');
    }

    const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      agregarTarea();
    }
    };

    const borrarTarea = (indexBorrar) => {
        setTareas(tareas.filter((_, index) => index !== indexBorrar));
    }
  

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
                        {tareas.map((t, index) =>(
                            <li 
                                key={index}>{t}
                                <i className="fa-solid fa-trash-can" onClick={() => borrarTarea(index)} ></i>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
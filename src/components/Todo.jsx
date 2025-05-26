import React, {useEffect, useRef, useState} from 'react';
import todo_icon from "../assets/todo_icon.png";
import TodoItem from "./TodoItem.jsx";

const Todo = () => {
    const [tab, setTab] = useState('all');
    const inputRef = useRef('');
    const [todoList,setTodoList]= useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);

    const setTabValue = (e) => {
        const newTab = e.target.id;
        setTab(newTab);
    };

    //add todo
    const addTodo = () => {
        const value = inputRef.current.value.trim();
        if (value === '') {
            return;
        }

        // add todo
        const todoObject = {
            id:Date.now(),
            text:value,
            isComplete:false,
        }
        setTodoList((prev)=>{
            return [...prev,todoObject]
        })

        // clear input
        inputRef.current.value = '';
    };

    //delete todo
    const deleteTodo = (id) => {
        setTodoList((prev) => {
            return prev.filter((todo) => todo.id !== id);
        });
    };

    //togogle todo
    const toggleTodo = (id) => {
        setTodoList((prev) => {
            return prev.map((todo) => {
                if (todo.id === id) {
                    return {...todo, isComplete: !todo.isComplete};
                }
                return todo;
            });
        });
    };

    useEffect(() => {
        localStorage.setItem('todos',JSON.stringify(todoList))
    }, [todoList]);

    return (
        <div className="place-self-center w-9/12 max-w-md flex flex-col p-7">
            <div className="flex space-x-2 bg-white p-1 border border-gray-500/50 rounded-md text-sm mb-5">
                {["all", "active", "completed"].map((type) => (
                    <div key={type} className="flex items-center">
                        <input
                            type="radio"
                            name="options"
                            id={type}
                            value={type}
                            className="hidden peer"
                            checked={tab === type}
                            onChange={setTabValue}
                        />
                        <label
                            htmlFor={type}
                            className="cursor-pointer rounded py-2 px-8 text-gray-500 transition-colors duration-200 peer-checked:bg-blue-500 peer-checked:text-white"
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </label>
                    </div>
                ))}
            </div>



                <div className="bg-white place-self-center w-full flex flex-col p-7 min-h-[550px] rounded-xl">
                    <div className="flex justify-between mt-1">
                        <div className="flex gap-2">
                            {/*<img src={todo_icon} className="w-4" alt=""/>*/}
                            <h1 className="text-1xl font-semibold">All To-Do List</h1>
                        </div>
                        <button type="button"
                                className="px-6 py-2 active:scale-95 transition bg-blue-500 rounded text-white shadow-lg shadow-blue-500/30 text-sm font-medium">Add
                            New
                        </button>
                    </div>

                    <div className="flex item-center my-7 bg-gray-200 rounded-full">
                        <input ref={inputRef}
                               onKeyDown={(e) => {
                                   if (e.key === "Enter") {
                                       addTodo()
                                   }
                               }}
                            className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
                            type="text" placeholder="Add your task"/>
                        <button onClick={addTodo}
                            className="border-none rounded-full bg-blue-500 w-25 h-14 text-white text-lg font-medium cursor-pointer"
                            type="button">Add +
                        </button>
                    </div>
                    {/*all todos*/}
                    {tab === "all" && (
                    <div className="">
                        {todoList.map((item,index) => (
                            <TodoItem key={index} {...item} deleteTodo={deleteTodo} toggleTodo={toggleTodo} tab='all'/>
                        ))}

                    </div>
                    )}
                    {/*Active todos*/}
                    {tab === "active" && (
                        <div className="">
                            {todoList.filter((item)=>item.isComplete === false).map((item,index) => (
                                <TodoItem key={index} {...item} deleteTodo={deleteTodo} toggleTodo={toggleTodo} tab='active'/>
                            ))}
                        </div>
                    )}
                    {/*Completed todos*/}
                    {tab === "completed" && (
                        <div className="">
                            {todoList.filter((item) => item.isComplete === true).map((item, index) => (
                                <TodoItem key={index} {...item} deleteTodo={deleteTodo} toggleTodo={toggleTodo} tab='completed'/>
                            ))}
                        </div>
                    )}
                </div>
        </div>
    )
};

export default Todo;

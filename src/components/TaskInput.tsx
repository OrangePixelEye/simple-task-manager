import { useState } from "react"
import { useTaskContext } from "../context/TodoContext";
import { Task } from "../types/Task";
import { v4 as uuidv4 } from 'uuid';

export function TaskInput() {
    const [taskName, setTaskName] = useState('');
    const { addTask } = useTaskContext();
    // TODO: make part of this code reusable
    const appendTasks = () => {
        const newTask : Task = {
            id: uuidv4() ,
            name: taskName,
            isCompleted: false
        }
        addTask(newTask)
        setTaskName('')
    }

    return (
        <div>
            <input value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
            <button onClick={() => appendTasks()}> Add task</button>
        </div>
    )
}
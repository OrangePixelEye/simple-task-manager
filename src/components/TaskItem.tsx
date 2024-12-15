import { useEffect, useState } from "react"
import { Task } from "../types/Task"
import { useTaskContext } from "../context/TodoContext";

type TaskItemProp = {
    task: Task,
    isRow: boolean
}

export function TaskItem({task, isRow} : TaskItemProp) {
    const [taskName, setTaskName] = useState(task.name);
    const [isCompleted, setIsCompleted] = useState(task.isCompleted);

    const { updateTask, removeTask } = useTaskContext();
    useEffect(() => {
        task.name = taskName
        task.isCompleted = isCompleted
        updateTask(task)
    }, [taskName, isCompleted])

    // update this to include a "server"
    const deleteItem = () => {
       removeTask(task.id)
    }



    if(isRow){
        return(
            <tr>
                <td>
                    <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
                </td>
                <td>
                    <input type="checkbox" checked={isCompleted}  onChange={() => setIsCompleted(!isCompleted)}></input>
                </td>
                <td>
                    <button onClick={deleteItem}>Delete</button>
                </td>
            </tr>
        )

    }
}
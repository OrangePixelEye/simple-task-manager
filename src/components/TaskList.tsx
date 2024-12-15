import {  useTaskContext } from "../context/TodoContext"
import { TaskItem } from "./TaskItem";

export const TaskList = () => {   
    const { tasks: taskList } = useTaskContext();
    return (
        <table>
            <thead>
                <tr> 
                    <td>Name</td>
                    <td>Completed</td>
                    <td>Options</td>
                </tr>
            </thead>
            <tbody>

            {taskList.map((task) => {
                return (
                    <TaskItem task={task} isRow={true} key={task.id}/>
                )
            })}
            </tbody>
        </table>
    )
}
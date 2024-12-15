import { createContext, ReactNode, useContext, useReducer, useEffect } from "react";
import { Task } from "../types/Task";
import { generateUuid } from "../utils/generateUuid";
import useLocalStorage from "../hooks/useLocalStorage";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (task: Task) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

interface TaskState {
  tasks: Task[];
}


type TaskReducerPayload =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "UPDATE_TASK"; payload: Task };

const TaskReducer = (state: TaskState, action: TaskReducerPayload): TaskState => {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask = { ...action.payload, id: generateUuid() };
      return { ...state, tasks: [...state.tasks, newTask] };
    }
    case "UPDATE_TASK": {
      const updatedTasks = state.tasks.map(task =>
        task.id === action.payload.id ? action.payload : task
      );
      return { ...state, tasks: updatedTasks };
    }
    case "DELETE_TASK": {
      const filteredTasks = state.tasks.filter(task => task.id !== action.payload);
      return { ...state, tasks: filteredTasks };
    }
    default:
      return state;
  }
};

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasksInMemory, setTasksInMemory] = useLocalStorage<Task[]>("tasks", []);
  const [state, dispatch] = useReducer(TaskReducer, { tasks: tasksInMemory });

  useEffect(() => {
    setTasksInMemory(state.tasks);
  }, [state.tasks]);

  const addTask = (task: Task) => dispatch({ type: "ADD_TASK", payload: task });

  const updateTask = (task: Task) => dispatch({ type: "UPDATE_TASK", payload: task });

  const removeTask = (id: string) => dispatch({ type: "DELETE_TASK", payload: id });

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        addTask,
        updateTask,
        removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext(): TaskContextType {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("Could not find TaskContext, please wrap your component in a TaskProvider.");
  }
  return context;
}

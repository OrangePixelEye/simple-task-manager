
import './App.css'
import { TaskList } from './components/TaskList'
import { TaskProvider } from './context/TodoContext'
import { TaskInput } from './components/TaskInput'

function App() {

  return (
    
    <TaskProvider>
      <TaskList/>
      <TaskInput/>
    </TaskProvider>
    
  )
}

export default App

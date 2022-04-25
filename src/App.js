import { useState } from 'react'
import './App.css'
import AddForm from './components/AddForm'
import TaskToEditForm from './components/TaskToEditForm'
import TodoList from './components/TodoList'

const data = [
  { id: 1, name: 'Write a blog post', isComplete: false },
  { id: 2, name: 'Go to the gym', isComplete: false },
  { id: 3, name: 'Take out the trash', isComplete: true }
]

const App = () => {
  const [todos, setTodos] = useState(data)
  const [newTodo, setnewTodo] = useState('')
  const [showUpdate, setShowUpdate] = useState(false)
  const [updateTask, setUpdateTask] = useState('')
  const [taskToEdit, setTaskToEdit] = useState([])

  const handleCreateNewTask = e => {
    e.preventDefault()
    if (newTodo !== '') {
      //enter to todos list
      const newTodoObj = {
        id: Math.random(1, 10000),
        name: newTodo,
        isComplete: false
      }
      const updatedTasks = [...todos, newTodoObj]
      setTodos(updatedTasks)
      setnewTodo('')
    }
  }

  const handleCheckboxClick = id => {
    const updatedTodos = todos.map(todo => {
      return todo.id === id
        ? { ...todo, isComplete: !todo.isComplete }
        : { ...todo }
    })
    setTodos(updatedTodos)
  }

  const handleDelete = id => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
  }

  const handleEdit = id => {
    const edit = todos.filter(todo => {
      return todo.id === id ? todo : null
    })
    setTaskToEdit(edit)
    setShowUpdate(true)
  }

  const handleUpdateTask = e => {
    e.preventDefault()
    const toEdit = taskToEdit[0]
    const updatedTaskList = todos.map(todo => {
      return todo.id === toEdit.id
        ? { ...todo, name: updateTask, isComplete: false }
        : { ...todo }
    })
    setTodos(updatedTaskList)
    setTaskToEdit([])
    setUpdateTask('')
    setShowUpdate(false)
  }

  return (
    <div className='app'>
      <div className='vstack gap-3 pt-4 col-md-5 mx-auto'>
        {/* div containing add form and update form */}
        <div className=' p-4 shadow-sm'>
          {/* form to add new tasks - component  */}
          <AddForm
            handleCreateNewTask={handleCreateNewTask}
            showUpdate={showUpdate}
            setnewTodo={setnewTodo}
            newTodo={newTodo}
          />
          {/* form to edit a task - component */}
          <TaskToEditForm
            taskToEdit={taskToEdit}
            showUpdate={showUpdate}
            handleUpdateTask={handleUpdateTask}
            setUpdateTask={setUpdateTask}
          />
        </div>
        {/* div containing a list to show all the tasks */}
        <div className=' p-4 shadow-sm'>
          {/* list to show all tasks */}
          <TodoList
            todos={todos}
            handleCheckboxClick={handleCheckboxClick}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  )
}

export default App

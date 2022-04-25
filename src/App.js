import { useState } from 'react'
import './App.css'
import AddForm from './components/AddForm'
import TaskToEditForm from './components/TaskToEditForm'

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
        <div className=' p-4 shadow-sm'>
          <ul className='list-group gap-2'>
            {todos &&
              todos.map(todo => (
                <div
                  key={todo.id}
                  className='d-flex justify-content-start align-items-center'
                >
                  <input
                    className='form-check-input'
                    type='checkbox'
                    onChange={() => handleCheckboxClick(todo.id)}
                    checked={todo.isComplete}
                  />
                  <li
                    className={
                      !todo.isComplete
                        ? 'todo-list-item list-group-item border-0 ms-2'
                        : 'todo-list-item-checked list-group-item border-0 ms-2'
                    }
                  >
                    {todo.name}
                  </li>
                  <div className='ms-auto d-flex gap-1'>
                    <button
                      type='button'
                      className='deleteBtn btn btn-danger'
                      onClick={() => handleDelete(todo.id)}
                    >
                      Delete
                    </button>
                    <button
                      type='button'
                      className='updateBtn btn btn-info'
                      onClick={() => handleEdit(todo.id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
          </ul>
          {todos.length < 1 && <p>Nothing to do :D</p>}
        </div>
      </div>
    </div>
  )
}

export default App

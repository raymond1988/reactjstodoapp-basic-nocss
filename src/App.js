import { useState } from 'react'
import './App.css'

const data = [
  { id: 1, name: 'go to sleep', isComplete: false },
  { id: 2, name: 'write react code', isComplete: false },
  { id: 3, name: 'clean the house', isComplete: true }
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
    <div className='App'>
      <div className='todo-input-wrapper'>
        <form
          className={!showUpdate ? 'show-forms' : 'hide-forms'}
          onSubmit={e => handleCreateNewTask(e)}
        >
          <input
            type='text'
            placeholder='what else todo?'
            onChange={e => setnewTodo(e.target.value)}
            value={newTodo}
          />
        </form>
        {taskToEdit &&
          taskToEdit.map(task => (
            <form
              className={showUpdate ? 'show-forms' : 'hide-forms'}
              onSubmit={e => handleUpdateTask(e)}
              key={task.id}
            >
              <input
                type='text'
                onChange={e => setUpdateTask(e.target.value)}
                defaultValue={task.name}
              />
            </form>
          ))}
      </div>
      <div className='todo-list-wrapper'>
        <ul className='todo-list'>
          {todos &&
            todos.map(todo => (
              <div key={todo.id} className='todo-list-item-container'>
                <input
                  type='checkbox'
                  onChange={() => handleCheckboxClick(todo.id)}
                  checked={todo.isComplete}
                />
                <li
                  className={
                    !todo.isComplete
                      ? 'todo-list-item'
                      : 'todo-list-item-checked'
                  }
                >
                  {todo.name}
                </li>
                <button
                  type='button'
                  className='deleteBtn'
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
                <button
                  type='button'
                  className='updateBtn'
                  onClick={() => handleEdit(todo.id)}
                >
                  Edit
                </button>
              </div>
            ))}
        </ul>
        {todos.length < 1 && <p>Nothing to do :D</p>}
      </div>
    </div>
  )
}

export default App

import React from 'react'

const TodoList = ({ todos, handleCheckboxClick, handleDelete, handleEdit }) => {
  return (
    <>
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
    </>
  )
}

export default TodoList

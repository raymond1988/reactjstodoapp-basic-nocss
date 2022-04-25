import React from 'react'

const TaskToEditForm = ({
  taskToEdit,
  showUpdate,
  handleUpdateTask,
  setUpdateTask
}) => {
  return (
    <>
      {taskToEdit &&
        taskToEdit.map(task => (
          <form
            className={showUpdate ? 'show-forms' : 'hide-forms'}
            onSubmit={e => handleUpdateTask(e)}
            key={task.id}
          >
            <input
              className='form-control'
              type='text'
              onChange={e => setUpdateTask(e.target.value)}
              defaultValue={task.name}
            />
          </form>
        ))}
    </>
  )
}

export default TaskToEditForm

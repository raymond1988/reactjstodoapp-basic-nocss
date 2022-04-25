import React from 'react'

const AddForm = ({ handleCreateNewTask, showUpdate, setnewTodo, newTodo }) => {
  return (
    <>
      <form
        className={!showUpdate ? 'show-forms' : 'hide-forms form-control'}
        onSubmit={e => handleCreateNewTask(e)}
      >
        <input
          className='form-control'
          type='text'
          placeholder='what else todo?'
          onChange={e => setnewTodo(e.target.value)}
          value={newTodo}
        />
      </form>
    </>
  )
}

export default AddForm

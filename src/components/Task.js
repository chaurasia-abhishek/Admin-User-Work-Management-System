import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import TaskContext from '../context/tasks/TaskContext'

export const Task = (props) => {
  const history = useHistory();
  const { task_description = 'this is task_description', createdBy = 'this is createdBy', assignedTo = 'this is assignedTo', status, statusLogs } = props.task
  const { Capital, settemptask } = useContext(TaskContext)
  const viewstatuslog = () => {
    settemptask(props.task);
    history.push('/viewlogs')
  }
  return (
    <div className='col-md-4 mb-4'>
      <div className="card-body d-flex flex-column align-items-center py-2 py-1 form-control border-dark m-auto" >
        <h5 className="card-title text-justified">{Capital(createdBy)} assigned task to {Capital(assignedTo)}</h5>
        <h6>{new Date(statusLogs[0].updatedAt).toLocaleString()}</h6>
        <h6>Status : {Capital(status)}</h6>
        <p className="card-text m-0 text-center">Task : {task_description} </p>
        <div className='m-auto p-3 '>
          <button type='btn btn-primary btn-sm' className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={viewstatuslog}>View Task Log</button>
        </div>
      </div>
    </div>
  )
}

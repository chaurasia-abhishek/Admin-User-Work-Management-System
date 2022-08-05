import React, { useContext, useRef, useState } from 'react'
import TaskContext from '../context/tasks/TaskContext'
import UserContext from '../context/users/UserContext'

export default function CreateTask() {

    const { createTask } = useContext(TaskContext)
    const { allusers } = useContext(UserContext)
    const [newtask, setnewtask] = useState({ task_description: '', assigneeId: 'none' })
    const ref = useRef(null);

    const handleonchange = (event) => {
        setnewtask({ ...newtask, [event.target.name]: event.target.value })
    }

    const submitnote = () => {
        createTask(newtask)
        ref.current.click();
        setnewtask({ task_description: '', assigneeId: '' })
    }
    return (
        <div className="modal fade z-index-3" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content p-4">
                    <h3 className="modal-title container text-center" id="exampleModalLabel">Create Task Here!</h3>
                    <div className="mb-3">
                        <label htmlFor="task_description" className="form-label">Task</label>
                        <input className={`form-control ${newtask.task_description.length < 3 ? 'border-danger' : ''}`} id="task_description" value={newtask.task_description} name="task_description" onChange={handleonchange} placeholder="Enter the task (minimum 3 characters)" />
                    </div>
                    <div className="mb-3">
                        <select className={`form-select me-3 `} id="assigneeId" name="assigneeId" value={newtask.assigneeId} onChange={handleonchange}>
                        <option value='none' >Assigned To</option>
                            {allusers.filter(u=>u.Role==='Team Member').map((user, i) => {
                                return <option key={i} value={user.id} disabled={user.onWork}>{user.Name}</option>
                            })}
                        </select>
                    </div>
                    <div className="container text-center">
                        <button type="button" className="btn btn-success mx-2" onClick={submitnote} disabled={newtask.task_description.length < 3 || newtask.assigneeId==='none' }>Create Task</button>
                        <button type="button" className="btn btn-success mx-2" ref={ref} data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

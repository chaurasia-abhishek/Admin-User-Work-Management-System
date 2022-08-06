import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import TaskContext from '../context/tasks/TaskContext'
import UserContext from '../context/users/UserContext'
import ChangeStatus from './ChangeStatus'
import Logs from './Logs'

const ViewTask = () => {
    const history = useHistory();
    const { temptask, Capital } = useContext(TaskContext)
    const { USER } = useContext(UserContext)
    const { deletetask } = useContext(TaskContext)
    const deletecurrenttask = () => {
        deletetask(temptask._id)
        history.push("/tasks")
    }
    if (temptask === 'null')
        history.push("/tasks")
    useEffect(() => { }, [temptask])
    return (
        <div className='d-flex align-items-center flex-column'>
            < ChangeStatus status={temptask.status} id={temptask._id} />
            <h2 className='text-center mb-4 mt-3'>Task-Log</h2>

            <div className='col-md-4'>
                <div className="card-body d-flex flex-column align-items-center py-2 py-1 form-control border-dark m-auto" >
                    <h5 className="card-title text-justified">{Capital(temptask.createdBy)} assigned task to {Capital(temptask.assignedTo)}</h5>
                    <h6>{new Date(temptask.statusLogs[0].updatedAt).toLocaleString()}</h6>
                    <h6>Status : {Capital(temptask.status)}</h6>
                    <p className="card-text m-0 text-center">Task : {temptask.task_description} </p>
                    <div className='d-flex justify-content-center'>
                        {temptask.status !== 'closed' && (USER.Role === 'Admin' || USER._id === temptask.assigneeId || USER._id === temptask.createrId) && <i className="fa-solid fa-pen-to-square p-1 m-1" data-bs-toggle="modal" data-bs-target="#newexampleModal" type='button' ></i>}
                        {USER.Role === 'Admin' && <i className="fa-solid fa-trash p-1 m-1 " disabled onClick={deletecurrenttask}></i>}
                    </div>
                </div>
            </div>
            <div className="row w-100 mt-5">
                {temptask.statusLogs.map((log, i) => <Logs log={log} key={i} />)}
            </div>
        </div>
    )
}

export default ViewTask
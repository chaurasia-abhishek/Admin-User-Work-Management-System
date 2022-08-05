import React, { useContext } from 'react'
import TaskContext from '../context/tasks/TaskContext'
import UserContext from '../context/users/UserContext'

export default function Alert() {
    const { alert } = useContext(TaskContext)
    const { Alert } = useContext(UserContext)
    let ALERT;
    alert?ALERT=alert:ALERT=Alert;
    return (
        <div className='m-0 p-0' style={{ height: '43px' }}>
            {ALERT && <div className={`alert alert-${ALERT.type} m-0 p-2`} role="alert" style={{ height: '42px' }}>
                {ALERT.msg}
            </div>}
        </div>
    )
}

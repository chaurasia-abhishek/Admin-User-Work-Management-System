import React, { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import TaskContext from '../context/tasks/TaskContext';
export default function CreateTask(props) {
    const history=useHistory();
    const { updatestatustask,fetchtasks } = useContext(TaskContext)
    const [newlog, setnewlog] = useState({ status: props.status })
    const ref = useRef(null);

    const handleonchange = (event) => {
        setnewlog({ status: event.target.value })
    }
    const submitnote = () => {
        updatestatustask(props.id, newlog)
        ref.current.click();
        fetchtasks();
        history.push('/tasks')
    }
    return (
        <div className="modal fade z-index-3" id="newexampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content p-4">
                    <h3 className="modal-title container text-center" id="exampleModalLabel">Change Status Here!</h3>
                    <div className="mb-3">
                        <label htmlFor="newstatus">Status</label>
                        <select className={`form-select me-3 `} id="newstatus" name="newstatus" value={newlog.assigneeId} onChange={handleonchange}>
                            <option value='created' disabled={props.status === 'closed' || props.status === 'completed' || props.status === 'in progress'}>created</option>
                            <option value='in progress' disabled={props.status === 'closed' || props.status === 'completed'}>in progress</option>
                            <option value='completed' disabled={props.status === 'closed'}>completed</option>
                            <option value='closed' >closed</option>
                        </select>
                    </div>
                    <div className="container text-center">
                        <button type="button" className="btn btn-success mx-2" onClick={submitnote} disabled={newlog.status === props.status}>Change Status</button>
                        <button type="button" className="btn btn-success mx-2" ref={ref} data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

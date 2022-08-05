import React, { useContext} from 'react'
import UserContext from '../context/users/UserContext'

const Logs = (props) => {
    const {Capital}=useContext(UserContext)
    return (
        <div className="col-md-3 p-3">
        <div className='d-flex flex-column align-items-center border '>
            <h5 className="card-title text-justified">Updated by {Capital(props.log.updatedBy)}</h5>
            <h6>{new Date(props.log.updatedAt).toLocaleString()}</h6>
            <h6>Status : {Capital(props.log.status)}</h6>
        </div>
        </div>
    )
}

export default Logs
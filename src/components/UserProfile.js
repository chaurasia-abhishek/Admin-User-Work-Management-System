import React, { useContext } from 'react'
import UserContext from '../context/users/UserContext'

const UserProfile = () => {
    const { USER, Capital } = useContext(UserContext)
    return (
        <>
            <table className='m-auto my-3'>
                <tbody >
                    <tr><th><span className='h2 p-2'>Name</span></th><td><span className='h2 p-2'>{Capital(USER.Name)}</span></td></tr>
                    <tr><th><span className='h2 p-2'>Role</span></th><td><span className='h2 p-2'>{USER.Role}</span></td></tr>
                    <tr><th><span className='h2 p-2'>Email</span></th><td><span className='h2 p-2'>{USER.Email}</span></td></tr>
                </tbody>
            </table>
            {USER.onWork && <div className="m-auto h2 ">You are on work</div>}
            {!USER.onWork && <div className='m-auto p-3 '>
                <button type='button' className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">Create Task</button>
            </div>}
        </>
    )
}

export default UserProfile
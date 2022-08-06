import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/users/UserContext';


export default function Signup() {
  const { SIGNUPAUTH } = useContext(UserContext)
  const [newusercredentials, setnewusercredentials,] = useState({ Email: '', Password: '', Name: '', Role: 'none' })
  let history = useHistory();

  const onchange = (event) => {
    setnewusercredentials({ ...newusercredentials, [event.target.name]: event.target.value })
  }
  const newusercredentialslogin = async (event) => {
    event.preventDefault();
    if (await SIGNUPAUTH(newusercredentials))
      history.push('/');
  }
  return (
    <div className="container m-auto col-md-7">
      <form className='m-1 p-1' onSubmit={newusercredentialslogin}>
        <h3 className='text-center'>Signup To Use</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">Name</label>
          <input autoComplete="off" type="Name" className={`form-control ${newusercredentials.Name.length > 0 && newusercredentials.Name.length < 3 ? 'border-danger' : ''}`} name='Name' value={newusercredentials.Name} onChange={onchange} id="exampleInputName1" aria-describedby="nameHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input autoComplete="off" type="Email" className={`form-control ${newusercredentials.Email.length > 0 && !newusercredentials.Email.includes('@') ? 'border-danger' : ''}`} name='Email' value={newusercredentials.Email} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input autoComplete="off" type="Password" className={`form-control ${newusercredentials.Password.length > 0 && newusercredentials.Password.length < 3 ? 'border-danger' : ''}`} name='Password' value={newusercredentials.Password} onChange={onchange} id="exampleInputPassword1" />
        </div>
        <div className="mb-3">
          <select className={`form-select `} name="Role" id="Role" value={newusercredentials.Role} onChange={onchange}>
            <option value='none'>Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Team Member" >Team Member</option>
          </select>
        </div>

        <button type='submit' className="btn btn-primary" disabled={newusercredentials.Password === '' || newusercredentials.Name === '' || newusercredentials.Email === '' || !newusercredentials.Email.includes('@') || newusercredentials.Role === 'none'} >SignUp</button>
      </form>
    </div>
  )
}

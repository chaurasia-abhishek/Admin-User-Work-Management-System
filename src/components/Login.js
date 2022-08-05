import React, { useContext, useState } from 'react'
import UserContext from '../context/users/UserContext';
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const { USERAUTH } = useContext(UserContext)
  const [usercredentials, setusercredentials] = useState({ Email: '', Password: '' })
  const onchange = (event) => {
    setusercredentials({ ...usercredentials, [event.target.name]: event.target.value })
  }
  const usercredentialslogin = async (event) => {
    event.preventDefault();
    if (await USERAUTH(usercredentials))
      history.push('/');
  }

  return (
    <div className="container m-auto col-md-7">
      <form className='m-1 p-1' onSubmit={usercredentialslogin}>
        <h3 className='text-center'>Login To Use</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input autoComplete="off" type="email" className={`form-control ${usercredentials.Email.length > 0 && !usercredentials.Email.includes('@') ? 'border-danger' : ''}`} name='Email' value={usercredentials.Email} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input autoComplete="off" type="password" className={`form-control ${usercredentials.Password.length > 0 && usercredentials.Password.length < 3 ? 'border-danger' : ''}`} name='Password' value={usercredentials.Password} onChange={onchange} id="exampleInputPassword1" />
        </div>
        <button type='submit' className="btn btn-primary" disabled={usercredentials.Password === '' || usercredentials.Email === '' || !usercredentials.Email.includes('@')} >Login</button>
      </form>
    </div>
  )
}

import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import UserContext from '../context/users/UserContext'
import TaskContext from '../context/tasks/TaskContext'

export default function Navbar() {
  const { loginstatus, setloginstatus } = useContext(UserContext)
  const { triggeralert } = useContext(TaskContext)
  const history = useHistory();

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark p-1" id='navbar'>
      <div className="container-fluid ">
        <Link className="navbar-brand " to="#">KARSPERTECH</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link " to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/tasks">Tasks</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>
          <div className="d-flex">
            <ul className="navbar-nav">
              {loginstatus && <li className="btn btn-primary mx-1 px-1 m-1" onClick={() => { localStorage.removeItem('authToken'); history.push("/login"); setloginstatus(false); triggeralert({ type: 'success', msg: 'Logout successfully' }) }}>Logout</li>}
              {!loginstatus && <Link className="btn btn-primary mx-1 px-1 m-1" to="/login">Login</Link>}
              {!loginstatus && <Link className="btn btn-primary mx-1 px-1 m-1" to="/signup">Sign Up</Link>}
            </ul>
          </div>
        </div>
      </div>
    </nav >
  )
}

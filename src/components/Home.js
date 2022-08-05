import React, { useContext, useEffect } from 'react'
import UserProfile from './UserProfile'
import CreateTask from './CreateTask'
import UserContext from '../context/users/UserContext'
import { useHistory } from 'react-router-dom'
import TaskContext from '../context/tasks/TaskContext'

const Home = () => {
  const history = useHistory()
  const { fetchusers, FETCHUSER, loginstatus } = useContext(UserContext)
  const { usertasks } = useContext(TaskContext)
  useEffect(() => {
    if (loginstatus)
      fetchusers();
    else if (localStorage.getItem('authToken')) {
      FETCHUSER();
      fetchusers();
    }
    else
      history.push("/login")

    // eslint-disable-next-line
  }, [usertasks])
  return (
    <div className='container my-2 p-2 d-flex flex-column'>
      <h2 className='m-auto p-1 d-inline'>User Profile</h2>
      <UserProfile />
      <CreateTask />
    </div>
  )
}

export default Home
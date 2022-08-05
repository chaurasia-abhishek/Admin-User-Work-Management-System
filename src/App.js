import { BrowserRouter, Switch, Route } from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './components/Home'
import Tasks from './components/Tasks'
import Signup from './components/Signup'
import Login from './components/Login'
import About from './components/About'
import Alert from './components/Alert'
import ViewTask from "./components/ViewTask"
import UserState from './context/users/UserState'
import TaskState from './context/tasks/TaskState'


function App() {
  return (
    <>
      <UserState>
        <TaskState>
          <BrowserRouter>
            <Navbar />
            <Alert />
            <Switch>
              <Route exact path='/'><Home /></Route>
              <Route exact path='/home'><Home /></Route>
              <Route exact path='/tasks'><Tasks /></Route>
              <Route exact path='/viewlogs'><ViewTask /></Route>
              <Route exact path='/signup'><Signup /></Route>
              <Route exact path='/login'><Login /></Route>
              <Route exact path='/about'><About /></Route>
            </Switch>
          </BrowserRouter>
        </TaskState>
      </UserState>
    </>
  )
}

export default App;

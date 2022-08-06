import { useState } from "react";
import TaskContext from "./TaskContext";
const TaskState = (props) => {

    const [usertasks, settasks] = useState([])

    //read task
    const fetchtasks = async () => {
        let response = await fetch(`http://localhost:4000/api/task/viewtask`, { method: 'get', headers: { 'authToken': localStorage.getItem('authToken') } });
        const newtaskresponse = await response.json();
        if (newtaskresponse.success)
            settasks(newtaskresponse.data)
        else {
            triggeralert({ type: 'danger', msg: newtaskresponse.msg ? newtaskresponse.msg : 'Unable to fetch notes' })
        }

    }

    //add task 
    const createTask = async (newtask) => {
        const jsontask = JSON.stringify(newtask)
        const response = await fetch(`http://localhost:4000/api/task/createtask`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            },
            body: jsontask
        });
        const newtaskresponse = await response.json()
        if (newtaskresponse.success) {
            settasks(usertasks.concat(newtaskresponse.data))
            triggeralert({ type: 'success', msg: newtaskresponse.msg ? newtaskresponse.msg : 'task is successfully added' })
        }
        else
            triggeralert({ type: 'danger', msg: 'unable to add task' })
    }

    // delete task
    const deletetask = async (deletetaskid) => {
        const newtaskresponse = await fetch(`http://localhost:4000/api/task/delete/${deletetaskid}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            }
        });
        if (newtaskresponse.success) {
            settasks(usertasks.filter((task) => { return task._id !== deletetaskid }))
            triggeralert({ type: 'success', msg: 'task is successfully deleted' })
        }
        else
            triggeralert({ type: 'danger', msg: newtaskresponse.msg ? newtaskresponse.msg : 'unable to delete the task' })
    }

    // //temp task use in edit task
    const [temptask, settemptask] = useState('null')
    const updatestatustask = async (id, log) => {
        const jsonlog = JSON.stringify(log)
        const response = await fetch(`http://localhost:4000/api/task/status/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            },
            body: jsonlog
        });
        const newtaskresponse = await response.json()
        if (newtaskresponse.success) {
            await fetchtasks();
            triggeralert({ type: 'success', msg: 'task log status is successfully changed' })
        }
        else
            triggeralert({ type: 'danger', msg: newtaskresponse.msg ? newtaskresponse.msg : 'unable to change task log status' })
    }

    //alert module
    const [alert, setalert] = useState()
    const triggeralert = (alert) => {
        setalert({ type: alert.type, msg: alert.msg })
        setTimeout(() => setalert(null), 1500)
    }

    //login status module
    const [loginstatus, setloginstatus] = useState(false)

    const Capital = word => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);

    return (
        <TaskContext.Provider value={{ usertasks, fetchtasks, createTask, deletetask, alert, triggeralert, setalert, loginstatus, setloginstatus, Capital, temptask, settemptask, updatestatustask }}>
            {props.children}
        </TaskContext.Provider>
    )
}
export default TaskState;
import { useState } from "react";
import TaskContext from "./TaskContext";
const TaskState = (props) => {

    const [usertasks, settasks] = useState([])

    //read task
    const fetchtasks = async () => {
        let response = await fetch(`http://localhost:4000/api/task/viewtask`, { method: 'get', headers: { 'authToken': localStorage.getItem('authToken') } });
        const t = await response.json();
        settasks(t.data)
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
        let newtaskresponse = await response.json()
        settasks(usertasks.concat(newtaskresponse.data))
        triggeralert({ type: 'success', msg: 'task is successfully added' })
    }

    // delete task
    const deletetask = async (deletetaskid) => {
        await fetch(`http://localhost:4000/api/task/delete/${deletetaskid}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            }
        });
        settasks(usertasks.filter((task) => { return task._id !== deletetaskid }))
        triggeralert({ type: 'success', msg: 'task is successfully deleted' })
    }

    // //temp task use in edit task
    const [temptask, settemptask] = useState('null')
    const updatestatustask = async(id,log) => {
        const jsonlog = JSON.stringify(log)
        const response = await fetch(`http://localhost:4000/api/task/status/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            },
            body: jsonlog
        });
        await response.json()
        await fetchtasks();
        triggeralert({ type: 'success', msg: 'task log status is successfully changed' })
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
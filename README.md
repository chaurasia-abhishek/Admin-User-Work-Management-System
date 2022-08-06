more details about this project on
https://helioweb.notion.site/helioweb/Full-Stack-Developer-Intern-task-45fbaec1f6b74b30a897085763882216

Project Details :-
There are two major components of the system, **USERS** and **TASKS.**

Users are people who can create tasks and update their status. Every user has a role associated. We have two types of user roles, “**ADMIN”** and “**TM USER”.**

Every user can create a task and assign it to another user. The assigned user will be able to update the task status and finally set it to complete. The assignee user can UPDATE or DELETE the task and can CLOSE the task once it is completed.

**ADMIN** on other hand will be able to perform all the operations on the given task.

> ***We will see the complete flow through an example step by step***


## Functionalities of the application

1. Any user (be it **ADMIN** or **TM USER**) can create a task as per the above task model and assign it to another **TM USER**.[ NOTE: **TM USER** cannot assign a task to **ADMIN,** assigned users cannot reassign task to another user] 


2. By default, the status logs will only show created status.

> For example consider 3 Users **Ramesh, Bhavya and Ankit.** Suppose **Ramesh and Bhavya** are **TM Users** and **Ankit** is **ADMIN.  Suppose Ramesh** Creates a task and assigns it to **Bhavya**. The following will be the entry in the database



3. The assigned User can only update the status of the tasks to either **IN PROGRESS** or **COMPLETED.** [NOTE: **Bhavya** will not be able to update any other thing in the task except status]


4. The statuses will be added to the array of status logs

> For example, (in continuation with the previous example) now **Bhavya** can change the status of the task to **IN PROGRESS** or **COMPLETED.**
On any change in status, the entry in the mongoose collection will look like as shown below

> **Ramesh** will be able to update the task and its status. He can also delete the task. **Ramesh** would be able to CLOSE the task. Once the task is closed, **Bhavya and Ramesh** can no longer update the task status. A task with closed status would look like as shown below


5. Admin will be able to create, update task and its status and will be able to close the task
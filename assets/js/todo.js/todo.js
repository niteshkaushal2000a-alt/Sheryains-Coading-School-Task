document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#saveTask').addEventListener('click', saveTodo);
    cardValues();
    recentThreeTasks();
    document.querySelector('.searchAndShow').addEventListener('click', toggleTaskTable);
});


function saveTodo(e) {

    e.preventDefault();

    if (!formValidation("taskForm")) return;

    let todo = getLocalStorage("todo") || [];

    const editId = localStorage.getItem("editTaskId");

    const formValue = getFormValue("taskForm");

    if (editId) {
        todo = todo.map(task => {

            if (task.id === editId) {

                return {
                    ...task,
                    ...formValue,
                    updateAt: new Date().toISOString()
                };

            }
            return task;
        });

        localStorage.removeItem("editTaskId");

        showToast("Task Updated Successfully", "success");

        document.querySelector("#saveTask").innerText = "Add Task";

    } else {
        formValue.id = crypto.randomUUID();
        formValue.createdAt = new Date().toISOString();
        formValue.updateAt = null;
        formValue.completed = false;
        formValue.completedAt = null;

        todo.push(formValue);

        showToast("Task Added Successfully", "success");
    }

    setLocalStorage("todo", todo);
    document.getElementById("taskForm").reset();
    recentThreeTasks();   
    cardValues();  
    bindAllTasks();
}

function cardValues() {
    const allTodo = getLocalStorage('todo');

    const totalTasks = allTodo.length;
    const completeTask = allTodo.filter(x => x.completed).length;;
    document.querySelector('#totalTasks').textContent = totalTasks;
    document.querySelector('#activeTasks').textContent = allTodo.filter(x => !x.completed).length;
    document.querySelector('#completeTask').textContent = completeTask
    document.querySelector('#highPriorityTask').textContent = allTodo.filter(x => x.priority === 'High').length;

    const remainingTask = totalTasks - completeTask;
    const completionPercentage = totalTasks > 0 ? Math.round((completeTask / totalTasks) * 100) : 0;

    document.querySelector('#completeion').textContent = `${completeTask}`;

    document.querySelector('#completedCount').textContent = `${completeTask}/${totalTasks}`;

    document.querySelector('#remainingCount').textContent = remainingTask;

    document.querySelector('#completionProgress').style.width = `${completionPercentage}%`;
}

function recentThreeTasks() {

    const taskSection = document.querySelector('.task-list-section');

    if (!taskSection) return;

    const task = getLocalStorage('todo');
    if (task.length === 0 || task === [] || task === null) {
        taskSection.innerHTML = `
    <div class="empty-state">
        <div class="empty-icon">🚀</div>

        <span class="empty-label">
            TASK MANAGEMENT
        </span>

        <h2>No Tasks Yet</h2>

        <p>
            Create your first task and start building
            momentum toward your goals.
        </p>

        <button class="primary-btn">
            + Add New Task
        </button>
    </div>
`;
        return;
    }

    const recentTasks = [...task]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

    taskSection.innerHTML = '';

    recentTasks.forEach(task => {

        const status = taskStatus(task.completed, task.dueDate);

        taskSection.innerHTML += `
            <div class="task-card premium-task ${task.completed ? 'completed' : ''}">
                <div class="task-main">
                    <div>
                        <h4>${task.taskName}</h4>
                        <p>${task.desc}</p>

                        <div class="task-meta">
                            <span class="meta-pill">${task.category}</span>

                            <span class="meta-pill ${task.priority.toLowerCase()}">
                                ${task.priority}
                            </span>

                            <span class= "${status.className}">
                                ${status.text}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="task-actions">
                    <span class="due-date">
                        Due: ${formateDate(task.dueDate)}
                    </span>

                    <button data-tooltip="Edit Task" class="icon-btn" onclick="editTask('${task.id}')">
                        ✎
                    </button>

                    <button data-tooltip="Delete Task" class="icon-btn" onclick="deleteTask('${task.id}')">
                        🗑
                    </button>

                     <button data-tooltip="Complete Task" class="icon-btn" onclick="completeTask('${task.id}', '${status.text}')">
                        ✅
                    </button>
                </div>
            </div>
        `;
    });
}

function toggleTaskTable() {
    const container = document.querySelector('.allContainer');
    const btn = document.querySelector('.searchAndShow');

    if (container.style.display === 'block') {
        container.style.display = 'none';
        btn.textContent = 'Show Tasks';
        return;
    }
    bindAllTasks();
    container.style.display = 'block';
    btn.textContent = 'Hide Tasks';
}

function bindAllTasks() {

    const tasks = getLocalStorage('todo');

    const container = document.querySelector('.allContainer');

    if (!tasks.length) {

        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📋</div>
                <h3>No Tasks Found</h3>
                <p>Create your first task to get started.</p>
            </div>
        `;

        return;
    }

    container.innerHTML = `
        <table class="task-table">

            <thead>
                <tr>
                    <th>Task Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Create Task</th>
                    <th>Update Task</th>
                    <th>Completed Date</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>

                ${tasks.map(task => `
                    <tr>
                        <td>${task.taskName}</td>
                        <td>${task.desc}</td>
                        <td>${task.category}</td>
                        <td>${task.priority}</td>
                        <td>${formateDate(task.dueDate)}</td>
                        <td>
                             <span class= "${taskStatus(task.completed, task.dueDate).className}">
                                ${taskStatus(task.completed, task.dueDate).text}
                            </span>
                        </td>
                        <td>${formateDate(task.createdAt)}</td>
                        <td>${formateDate(task.updateAt)}</td>
                        <td>${formateDate(task.completedAt)}</td>
                        <td>
                     <button data-tooltip="Edit Task" class="icon-btn" onclick="editTask('${task.id}')">
                        ✎
                      </button>

                    <button data-tooltip="Delete Task" class="icon-btn" onclick="deleteTask('${task.id}')">
                        🗑
                    </button>

                     <button data-tooltip="Complete Task" class="icon-btn" onclick="completeTask('${task.id}', '${taskStatus(task.completed, task.dueDate).text}')">
                        ✅
                    </button>
                        </td>
                    </tr>

                `).join('')}

            </tbody>

        </table>
    `;
}

function taskStatus(completed, dueDate) {
    // const now = new Date();
    // const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const today = new Date().toISOString().split('T')[0];

    if (completed) {
        return {
            text: 'Completed',
            className: 'status-completed'
        }
    }

    if (dueDate < today && !completed) {

        return {
            text: 'Overdue',
            className: 'status-overdue'
        };
    }

    return {
        text: 'Active',
        className: 'status-active'
    };
}

function editTask(id) {
    const todo = getLocalStorage("todo") || [];

    const task = todo.find(item => item.id === id);

    if (!task) return;

    document.getElementById("taskName").value = task.taskName;
    document.getElementById("desc").value = task.desc;
    document.getElementById("priority").value = task.priority;
    document.getElementById("categories").value = task.category;
    document.getElementById("dueDate").value = task.dueDate;

    localStorage.setItem("editTaskId", id);
    document.querySelector("#saveTask").innerText = "Update Task";
}

function completeTask(id, status) {
    if (status === 'Overdue') {
        showToast("Task deadline has passed. Please update the due date first.", "warning");
        return;
    }

    const task = getLocalStorage('todo');
    const existingTask = task.find(x => x.id === id);
    if (!existingTask) return;

    if (existingTask && !existingTask.completed) {
        existingTask.completed = true;
        existingTask.completedAt = new Date().toISOString().split('T')[0];
    }

    setLocalStorage('todo', task);
    showToast("Task completed successfully.", "success");
    recentThreeTasks();
    cardValues();
    bindAllTasks();
}

function deleteTask(id) {

    const isConfirmed = confirm(
        "Are you sure you want to delete this task?"
    );

    if (!isConfirmed) {
        showToast("Task deletion cancelled", "info");
        return;
    }

    let todo = getLocalStorage("todo") || [];

    todo = todo.filter(task => task.id !== id);

    setLocalStorage("todo", todo);

    bindAllTasks();
    recentThreeTasks();
    cardValues();
    showToast("Task deleted successfully", "success");
    location.reload();
}
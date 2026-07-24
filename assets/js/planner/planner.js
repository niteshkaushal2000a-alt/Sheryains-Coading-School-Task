document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#displayPlannerTable').addEventListener('click', togglePlannerTable);
    document.querySelector('#savePlanner').addEventListener('click', savePlannerEntry);
    cardValuesForPlanner();
    recentFourTasks();
    bindAllPlanner();
});

function togglePlannerTable() {
    const container = document.querySelector('#allContainerPlanner');
    const btn = document.querySelector('#displayPlannerTable');

    if (container.style.display === 'block') {
        container.style.display = 'none';
        btn.textContent = 'Show Planner';
        return;
    }
    bindAllPlanner();
    container.style.display = 'block';
    btn.textContent = 'Hide Planner';
}

function savePlannerEntry(e) {
    e.preventDefault();
    if (!formValidation("plannerForm")) return;

    let planner = getLocalStorage("planner") || [];

    const editId = localStorage.getItem("editPlannerId");

    const formValue = getFormValue("plannerForm");

    if (editId) {

        planner = planner.map(item => {

            if (item.id === editId) {

                return {
                    ...item,
                    ...formValue,
                    updateAt: new Date().toISOString()
                };
            }

            return item;
        });

        removeKey('editPlannerId');
        showToast("Planner Updated Successfully", "success");
        document.querySelector("#savePlanner").innerText = "Save Planner";
    } else {

        formValue.id = crypto.randomUUID();
        formValue.createdAt = new Date().toISOString();
        formValue.updateAt = null;
        formValue.completed = false;
        formValue.completedAt = null;

        planner.push(formValue);

        showToast("Planner Added Successfully", "success");
    }

    setLocalStorage("planner", planner);
    document.getElementById("plannerForm").reset();
    recentFourTasks();
    cardValuesForPlanner();
    bindAllPlanner();
}

function cardValuesForPlanner() {

    const allPlannerData = getLocalStorage("planner") || [];

    const today = new Date().toISOString().split("T")[0];

    const totalPlanner = allPlannerData.length;

    const todayPlanner = allPlannerData.filter(
        planner => planner.date === today
    ).length;

    const completedPlans = allPlannerData.filter(
        planner => planner.completed
    ).length;

    const upcomingPlans = allPlannerData.filter(
        planner =>
            !planner.completed &&
            planner.date >= today
    ).length;

    document.querySelector("#totalPlanner").textContent =
        totalPlanner || "NA";

    document.querySelector("#todayplanner").textContent =
        todayPlanner || "NA";

    document.querySelector("#completedPlans").textContent =
        completedPlans || "NA";

    document.querySelector("#upcomingPlans").textContent =
        upcomingPlans || "NA";
}

function getTodayDate() {
    return new Date().toLocaleDateString("en-GB").replace(/\//g, "-");
}

function recentFourTasks() {

    const taskSection = document.querySelector('.planner-list-section');

    if (!taskSection) return;

    const task = getLocalStorage('planner');
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
    </div>
`;
        return;
    }

    const recentTasks = [...task]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

    taskSection.innerHTML = '';

    recentTasks.forEach(task => {

        const status = taskStatusPlanner(task.completed, task.dueDate);

        taskSection.innerHTML += `
            <div class="task-card premium-task ${task.completed ? 'completed' : ''}">
                <div class="task-main">
                    <div>
                        <h4>${task.title}</h4>
                        <p>${task.description}</p>

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
                        Due: ${formateDate(task.date)}
                    </span>

                    <button data-tooltip="Edit Task" class="icon-btn" onclick="editPlanner('${task.id}')">
                        ✎
                      </button>

                    <button data-tooltip="Delete Task" class="icon-btn" onclick="deletePlanner('${task.id}')">
                        🗑
                    </button>

                     <button data-tooltip="Complete Task" class="icon-btn" onclick="completePlanner('${task.id}', '${taskStatus(task.completed, task.dueDate).text}')">
                        ✅
                    </button>
                </div>
            </div>
        `;
    });
}

function taskStatusPlanner(completed, dueDate) {
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

function bindAllPlanner() {

    const tasks = getLocalStorage('planner');
    const container = document.querySelector('#allContainerPlanner');

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
    <div class="table-wrapper">
        <table class="task-table" style = 'font-size: 12px'>

            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Create Task</th>
                    <th>Update Task</th>
                    <th>Completed Date</th>
                    <th>Notes</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>

                ${tasks.map(task => `
                    <tr>
                        <td>${task.title}</td>
                        <td>${task.description}</td>
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
                        <td>${formateDate(task.notes)}</td>
                        <td>
                     <button data-tooltip="Edit Task" class="icon-btn" onclick="editPlanner('${task.id}')">
                        ✎
                      </button>

                    <button data-tooltip="Delete Task" class="icon-btn" onclick="deletePlanner('${task.id}')">
                        🗑
                    </button>

                     <button data-tooltip="Complete Task" class="icon-btn" onclick="completePlanner('${task.id}', '${taskStatus(task.completed, task.dueDate).text}')">
                        ✅
                    </button>
                        </td>
                    </tr>

                `).join('')}

            </tbody>

        </table>
    </div>
    `;
}

function editPlanner(id) {

    const planners = getLocalStorage("planner");

    const planner = planners.find(item => item.id === id);

    if (!planner) return;

    document.getElementById("plannerTitle").value = planner.title || "";
    document.getElementById("description").value = planner.description || "";
    document.getElementById("startTime").value = planner.startTime || "";
    document.getElementById("endTime").value = planner.endTime || "";
    document.getElementById("priority").value = planner.priority || "Medium";
    document.getElementById("categoriesPlanner").value = planner.category || "";
    document.getElementById("date").value = planner.date || "";
    document.getElementById("notes").value = planner.notes || "";

    localStorage.setItem("editPlannerId", id);
    document.querySelector("#savePlanner").innerText = "Update Planner";
    const plannerFormWrapper = document.getElementById("plannerFormWrapper");
    plannerFormWrapper.style.display = "block";
}

function completePlanner(id) {
    const planners = getLocalStorage("planner") || [];
    const planner = planners.find(item => item.id === id);

    if (!planner) return;

    if (!planner.completed) {
        planner.completed = true;
        planner.completedAt = new Date().toISOString();
    }

    setLocalStorage("planner", planners);
    showToast("Planner completed successfully", "success");

    recentFourTasks();
    cardValuesForPlanner();
    bindAllPlanner();
}

function deletePlanner(id) {

    const isConfirmed = confirm(
        "Are you sure you want to delete this planner?"
    );

    if (!isConfirmed) {
        showToast("Planner deletion cancelled", "info");
        return;
    }

    let planners = getLocalStorage("planner") || [];

    planners = planners.filter(item => item.id !== id);

    setLocalStorage("planner", planners);

    bindAllPlanner();
    recentFourTasks();
    cardValuesForPlanner();
    showToast("Planner deleted successfully", "success");
}
import { storeProject, loadProjects, deleteProject, editProject, toggleTaskStateInProject, deleteTaskFromProject, editTaskInProject, addTaskToProject } from './Storage';
import { Project } from './Project';
import { openProjectModal, openTaskModal } from './Modal';

// Function to create a new project and add it to the UI
export function createProject(projectName) {
    const projectsDiv = document.querySelector('.project-projects');

    // Create a new Project instance with a unique ID
    const newProject = new Project(projectName);

    // Create a paragraph element for the project
    const proj = document.createElement('p');
    proj.classList.add('project');
    proj.textContent = newProject.name;

    // Create an Edit Project button
    const editProjectButton = document.createElement('button');
    editProjectButton.classList.add('edit-project');
    editProjectButton.textContent = 'Edit Project';

    // Add an event listener to the Edit Project button
    editProjectButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the project click event from firing
        openProjectModal((newProjectName) => {
            editProject(newProject.id, newProjectName); // Edit the project
            loadProjectToUi(); // Refresh the UI
        });
    });

    // Create a Delete Project button
    const delProject = document.createElement('button');
    delProject.classList.add('delete-project');
    delProject.textContent = 'Delete Project';

    // Add an event listener to the Delete Project button
    delProject.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the project click event from firing
        document.querySelector('.content-heading').textContent = ''; // Force clear the content-heading div
        const confirmDelete = confirm('Are you sure you want to delete this project?');
        if (confirmDelete) {
            deleteProject(newProject.id); // Delete the project by ID
            loadProjectToUi(); // Refresh the UI
        }
    });

    // Append the Edit and Delete buttons to the project element
    proj.appendChild(editProjectButton);
    proj.appendChild(delProject);

    // Append the project element to the projects container
    projectsDiv.appendChild(proj);

    // Store the new project in localStorage
    storeProject(newProject);
}

// Function to display tasks for the selected project
export function displayTasksForProject(projectId) {
    const projects = JSON.parse(localStorage.getItem('Projects')) || [];
    const project = projects.find(proj => proj.id === projectId);
    const tasksDiv = document.querySelector('.tasks');

    if (project) {
        tasksDiv.innerHTML = ''; // Clear the tasks div

        // Display the tasks for the selected project
        project.tasks.forEach((task) => {
            const taskContainer = createTaskContainer(task, project.id);
            tasksDiv.appendChild(taskContainer);
        });
    }
}

// Function to display all tasks from all projects
export function displayAllTasks() {
    const projects = JSON.parse(localStorage.getItem('Projects')) || [];
    const tasksDiv = document.querySelector('.tasks');
    tasksDiv.innerHTML = ''; // Clear the tasks div

    projects.forEach((project) => {
        project.tasks.forEach((task) => {
            const taskContainer = createTaskContainer(task, project.id);
            tasksDiv.appendChild(taskContainer);
        });
    });
}

// Function to display today's tasks
export function displayTodaysTasks() {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const projects = JSON.parse(localStorage.getItem('Projects')) || [];
    const tasksDiv = document.querySelector('.tasks');
    tasksDiv.innerHTML = ''; // Clear the tasks div

    projects.forEach((project) => {
        project.tasks.forEach((task) => {
            if (task.dueDate === today) {
                const taskContainer = createTaskContainer(task, project.id);
                tasksDiv.appendChild(taskContainer);
            }
        });
    });
}

// Function to display this week's tasks
export function displayThisWeeksTasks() {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // End of the week (Saturday)

    const projects = JSON.parse(localStorage.getItem('Projects')) || [];
    const tasksDiv = document.querySelector('.tasks');
    tasksDiv.innerHTML = ''; // Clear the tasks div

    projects.forEach((project) => {
        project.tasks.forEach((task) => {
            const taskDate = new Date(task.dueDate);
            if (taskDate >= startOfWeek && taskDate <= endOfWeek) {
                const taskContainer = createTaskContainer(task, project.id);
                tasksDiv.appendChild(taskContainer);
            }
        });
    });
}

// Helper function to create a task container
function createTaskContainer(task, projectId) {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    const taskCheck = document.createElement('input');
    taskCheck.type = 'checkbox';
    taskCheck.classList.add('task-check');
    taskCheck.checked = task.done;

    const taskTitle = document.createElement('p');
    taskTitle.textContent = task.title;
    taskTitle.classList.add('task-title');
    taskTitle.style.textDecoration = task.done ? 'line-through' : 'none';

    const taskDescription = document.createElement('p');
    taskDescription.textContent = task.description;
    taskDescription.classList.add('task-description');

    const taskDate = document.createElement('span');
    taskDate.textContent = task.dueDate;
    taskDate.classList.add('task-date');

    const taskPriority = document.createElement('span');
    taskPriority.textContent = task.priority;
    taskPriority.classList.add('task-priority');

    const editTask = document.createElement('button');
    editTask.textContent = 'Edit task';
    editTask.classList.add('edit-task');

    const deleteTask = document.createElement('button');
    deleteTask.textContent = 'Delete task';
    deleteTask.classList.add('delete-task');

    // Add event listeners for task actions
    taskCheck.addEventListener('change', () => {
        toggleTaskStateInProject(projectId, task.id);
        taskTitle.style.textDecoration = taskCheck.checked ? 'line-through' : 'none';
    });

    deleteTask.addEventListener('click', () => {
        const confirmDelete = confirm('Are you sure you want to delete this task?');
        if (confirmDelete) {
            deleteTaskFromProject(projectId, task.id); // Delete the task from localStorage
            taskContainer.remove(); // Remove the task container from the UI instantly
        }
    });

    editTask.addEventListener('click', () => {
        openTaskModal((updatedTask) => {
            editTaskInProject(projectId, task.id, updatedTask);
            loadProjectToUi(); // Refresh the UI
        });
    });

    // Append elements to the task container
    taskContainer.appendChild(taskCheck);
    taskContainer.appendChild(taskTitle);
    taskContainer.appendChild(taskDescription);
    taskContainer.appendChild(taskDate);
    taskContainer.appendChild(taskPriority);
    taskContainer.appendChild(editTask);
    taskContainer.appendChild(deleteTask);

    return taskContainer;
}

export function loadProjectToUi() {
    const projectsDiv = document.querySelector('.project-projects');
    const contentHeading = document.querySelector('.content-heading');
    const addTaskBtn = document.querySelector('.add-task');

    // Clear the existing content in the projects container
    projectsDiv.innerHTML = '';

    // Load projects from localStorage
    const projectsArr = loadProjects();

    // Loop through the projects and create UI elements for each
    projectsArr.forEach((project) => {
        const proj = document.createElement('p');
        proj.classList.add('project');
        proj.textContent = project.name;

        // Create an Edit Project button
        const editProjectButton = document.createElement('button');
        editProjectButton.classList.add('edit-project');
        editProjectButton.textContent = 'Edit Project';

        // Add an event listener to the Edit Project button
        editProjectButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the project click event from firing
            openProjectModal((newProjectName) => {
                editProject(project.id, newProjectName); // Edit the project
                loadProjectToUi(); // Refresh the UI
            });
        });

        // Create a Delete Project button
        const delProject = document.createElement('button');
        delProject.classList.add('delete-project');
        delProject.textContent = 'Delete Project';

        // Add an event listener to the Delete Project button
        delProject.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the project click event from firing
            document.querySelector('.content-heading').textContent = ''; // Force clear the content-heading div
            const confirmDelete = confirm('Are you sure you want to delete this project?');
            if (confirmDelete) {
                deleteProject(project.id); // Delete the project by ID
                loadProjectToUi(); // Refresh the UI
            }
        });

        // Append the Edit and Delete buttons to the project element
        proj.appendChild(editProjectButton);
        proj.appendChild(delProject);

        // Add an event listener to the project element
        proj.addEventListener('click', () => {
            contentHeading.textContent = project.name;
            addTaskBtn.style.display = 'block'; // Show the Add Task button
            displayTasksForProject(project.id); // Display tasks for the selected project
        });

        // Append the project element to the projects container
        projectsDiv.appendChild(proj);
    });
}
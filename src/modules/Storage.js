// Function to store a project in localStorage
export function storeProject(projectObject) {
    let projectsArray = JSON.parse(localStorage.getItem('Projects')) || [];
    projectsArray.push(projectObject);
    localStorage.setItem('Projects', JSON.stringify(projectsArray));
}

// Function to load projects from localStorage
export function loadProjects() {
    try {
        const projectsData = localStorage.getItem('Projects');
        return projectsData ? JSON.parse(projectsData) : [];
    } catch (error) {
        console.error('Error loading projects from localStorage:', error);
        return [];
    }
}

// Function to delete a project from localStorage
export function deleteProject(projectId) {
    const projectsData = JSON.parse(localStorage.getItem('Projects')) || [];
    const updatedProjects = projectsData.filter(project => project.id !== projectId);
    localStorage.setItem('Projects', JSON.stringify(updatedProjects));
}

// Function to edit a project in localStorage
export function editProject(projectId, newProjectName) {
    const projectsData = JSON.parse(localStorage.getItem('Projects')) || [];
    const projectToEdit = projectsData.find(project => project.id === projectId);
    if (projectToEdit) {
        projectToEdit.name = newProjectName;
        localStorage.setItem('Projects', JSON.stringify(projectsData));
    }
}

// Function to delete a task from a project
export function deleteTaskFromProject(projectId, taskId) {
    const projectsData = JSON.parse(localStorage.getItem('Projects')) || [];
    const projectToUpdate = projectsData.find(project => project.id === projectId);
    if (projectToUpdate) {
        projectToUpdate.tasks = projectToUpdate.tasks.filter(task => task.id !== taskId);
        localStorage.setItem('Projects', JSON.stringify(projectsData));
    }
}

// Function to add a task to a project
export function addTaskToProject(projectId, task) {
    const projectsData = JSON.parse(localStorage.getItem('Projects')) || [];
    const projectToUpdate = projectsData.find(project => project.id === projectId);
    if (projectToUpdate) {
        projectToUpdate.tasks.push(task);
        localStorage.setItem('Projects', JSON.stringify(projectsData));
    }
}

// Function to edit a task in a project
export function editTaskInProject(projectId, taskId, updatedTask) {
    const projectsData = JSON.parse(localStorage.getItem('Projects')) || [];
    const projectToUpdate = projectsData.find(project => project.id === projectId);
    if (projectToUpdate) {
        const taskToEdit = projectToUpdate.tasks.find(task => task.id === taskId);
        if (taskToEdit) {
            Object.assign(taskToEdit, updatedTask);
            localStorage.setItem('Projects', JSON.stringify(projectsData));
        }
    }
}

// Function to toggle a task's state in a project
export function toggleTaskStateInProject(projectId, taskId) {
    const projectsData = JSON.parse(localStorage.getItem('Projects')) || [];
    const projectToUpdate = projectsData.find(project => project.id === projectId);
    if (projectToUpdate) {
        const taskToToggle = projectToUpdate.tasks.find(task => task.id === taskId);
        if (taskToToggle) {
            taskToToggle.done = !taskToToggle.done;
            localStorage.setItem('Projects', JSON.stringify(projectsData));
        }
    }
}
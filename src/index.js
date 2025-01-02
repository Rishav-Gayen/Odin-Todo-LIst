import { createProject, loadProjectToUi, displayTasksForProject, displayAllTasks, displayTodaysTasks, displayThisWeeksTasks } from './modules/UI';
import { addTaskToProject } from './modules/Storage';
import { openTaskModal, openProjectModal } from './modules/Modal';

// Get the buttons
const addProjectBtn = document.querySelector('.add-project');
const addTaskBtn = document.querySelector('.add-task');

// Add event listener for the "Add Project" button
addProjectBtn.addEventListener('click', () => {
    openProjectModal((projectName) => {
        createProject(projectName); // Create the project
        loadProjectToUi(); // Refresh the UI
    });
});

// Add event listener for the "Add Task" button
addTaskBtn.addEventListener('click', () => {
    const selectedProject = document.querySelector('.content-heading').textContent;
    const projects = JSON.parse(localStorage.getItem('Projects')) || [];
    const project = projects.find(proj => proj.name === selectedProject);

    if (project) {
        openTaskModal((newTask) => {
            addTaskToProject(project.id, newTask); // Add the task to the selected project
            displayTasksForProject(project.id); // Display tasks for the selected project
        });
    } else {
        alert('Please select a project first.');
    }
});

// Get the category elements
const homeCategory = document.querySelector('.home');
const todayCategory = document.querySelector('.today');
const weekCategory = document.querySelector('.week');

// Add event listeners for the categories
homeCategory.addEventListener('click', () => {
    document.querySelector('.content-heading').textContent = 'Home';
    addTaskBtn.style.display = 'none'; // Hide the Add Task button
    displayAllTasks(); // Display all tasks
});

todayCategory.addEventListener('click', () => {
    document.querySelector('.content-heading').textContent = 'Today';
    addTaskBtn.style.display = 'none'; // Hide the Add Task button
    displayTodaysTasks(); // Display today's tasks
});

weekCategory.addEventListener('click', () => {
    document.querySelector('.content-heading').textContent = 'Week';
    addTaskBtn.style.display = 'none'; // Hide the Add Task button
    displayThisWeeksTasks(); // Display this week's tasks
});

// Load projects into the UI when the page loads
window.addEventListener('load', () => {
    loadProjectToUi();
});
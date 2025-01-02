// Function to open the project modal
export function openProjectModal(callback) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const projectNameInput = document.createElement('input');
    projectNameInput.type = 'text';
    projectNameInput.placeholder = 'Enter project name';

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Create Project';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add('cancel-button');

    // Add an event listener to the submit button
    submitButton.addEventListener('click', () => {
        const projectName = projectNameInput.value.trim();
        if (projectName) {
            callback(projectName); // Pass the project name to the callback
            modal.remove();
        } else {
            alert('Project name cannot be empty!');
        }
    });

    // Add an event listener to the cancel button
    cancelButton.addEventListener('click', () => {
        modal.remove(); // Close the modal without performing any action
    });

    modalContent.appendChild(projectNameInput);
    modalContent.appendChild(submitButton);
    modalContent.appendChild(cancelButton);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

// Function to open the task modal
export function openTaskModal(callback) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const taskTitleInput = document.createElement('input');
    taskTitleInput.type = 'text';
    taskTitleInput.placeholder = 'Enter task title';

    const taskDescriptionInput = document.createElement('input');
    taskDescriptionInput.type = 'text';
    taskDescriptionInput.placeholder = 'Enter task description';

    const taskDueDateInput = document.createElement('input');
    taskDueDateInput.type = 'date';
    taskDueDateInput.placeholder = 'Enter task due date';

    const taskPriorityInput = document.createElement('select');
    taskPriorityInput.innerHTML = `
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
    `;

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Add Task';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add('cancel-button');

    // Add an event listener to the submit button
    submitButton.addEventListener('click', () => {
        const task = {
            title: taskTitleInput.value.trim(),
            description: taskDescriptionInput.value.trim(),
            dueDate: taskDueDateInput.value,
            priority: taskPriorityInput.value,
            done: false,
            id: Date.now().toString()
        };

        if (task.title) {
            callback(task); // Pass the task object to the callback
            modal.remove();
        } else {
            alert('Task title cannot be empty!');
        }
    });

    // Add an event listener to the cancel button
    cancelButton.addEventListener('click', () => {
        modal.remove(); // Close the modal without performing any action
    });

    modalContent.appendChild(taskTitleInput);
    modalContent.appendChild(taskDescriptionInput);
    modalContent.appendChild(taskDueDateInput);
    modalContent.appendChild(taskPriorityInput);
    modalContent.appendChild(submitButton);
    modalContent.appendChild(cancelButton);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}
export class Project{
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.id = Date.now().toString();
    }

    addTask() {
        this.tasks.push(task);
    }

    deleteTask(taskIndex) {
        this.tasks.splice(taskIndex, 1);
    }

    editProject(projectName) {
        this.name = projectName;
    }
}

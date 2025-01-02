export class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = false;
        this.id = Date.now().toString();
    }

    editTask(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    toggleTaskState() {
        if(this.done == false) {
            this.done = true;
        }
        else {
            this.done = false;
        }
    }
}
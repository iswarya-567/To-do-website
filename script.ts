interface Task {
    id: number;
    title: string;
    completed: boolean;
}
let tasks: Task[] = [];

function addTask(title: string): void {
    const newTask: Task = {
        id: Date.now(),
        title: title,
        completed: false
    };

    tasks.push(newTask);
}
function saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
    const storedTasks = localStorage.getItem("tasks");

    return storedTasks ? JSON.parse(storedTasks) as Task[] : [];
}
// Define the Task object with properties
// Define Task object using prototype
function Task(description, dueDate, priority) {
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false; // Add a completed property
}


// Use prototypes to add functionality to Task objects
/*Task.prototype.complete = function() {
  this.completed = true;
};*/



// Define the list of tasks as an array
const taskList = [];


// Define a function to add a new task to the array
function addTask(description, dueDate, priority) {
    const task = new Task(description, dueDate, priority);
    taskList.push(task);
    console.log(`Task "${description}" added.`);
}

// Define a function to mark a task as completed
function markTaskCompleted(description) {
    const taskIndex = taskList.findIndex(task => task.description === description);
    if (taskIndex !== -1) {
        taskList[taskIndex].completed = true;
        console.log(`Task "${description}" marked as completed.`);
    } else {
        console.log(`No task found with description "${description}".`);
    }
}
// Define a function to delete a task from the array
function deleteTask(description) {
    const taskIndex = taskList.findIndex(task => task.description === description);
    if (taskIndex !== -1) {
        taskList.splice(taskIndex, 1);
        console.log(`Task "${description}" deleted.`);
    } else {
        console.log(`No task found with description "${description}".`);
    }
}
// Define function to filter and sort tasks
function filterAndSortTasks(filterType, sortType) {
    let filteredTasks;
    if (filterType === "completed") {
        filteredTasks = taskList.filter(task => task.completed);
    } else if (filterType === "incomplete") {
        filteredTasks = taskList.filter(task => !task.completed);
    } else {
        filteredTasks = taskList;
    }


    if (sortType === "dueDate") {
        filteredTasks.sort((task1, task2) => task1.dueDate - task2.dueDate);
    } else if (sortType === "priority") {
        filteredTasks.sort((task1, task2) => task1.priority - task2.priority);
    }
    console.log("Filtered and sorted tasks:");
    console.table(filteredTasks);
}

// Define function to print list of actions
function printActions() {

    console.log("Actions:");
    console.log("- Add a task: add <description> <dueDate> <priority>");
    console.log("- Mark a task as completed: mark <description>");
    console.log("- Delete a task: delete <description>");
    console.log("- Filter and sort tasks: filter <completed|incomplete|all> <dueDate|priority>");
    console.log("What's your choice ?");
    console.log(" Please enter as the same structure :) ");

}
// Define function to read input from user and execute commands
function runToDoList() {
    printActions();
    process.stdin.on("data", input => {
        const inputArray = input.toString().trim().split(" ");
        const command = inputArray[0];
        const params = inputArray.slice(1);
        switch (command) {
            case "add":
                const [description, dueDate, priority] = params;
                addTask(description, new Date(dueDate), parseInt(priority));
                break;
            case "mark":
                markTaskCompleted(params[0]);
                break;
            case "delete":
                deleteTask(params[0]);
                break;
            case "filter":
                const [filterType, sortType] = params;
                filterAndSortTasks(filterType, sortType);
                break;

            default:
                console.log("Invalid command.");
                break;
        }
        printActions();
    });
}

// Run the to-do list app
runToDoList();
console.log("Script started");

// Add a task
function addTask() {
    /*
    <div id="task1" class="task-item">
        <input type="checkbox" id="checkbox1">
        <label id="label1">Take out trash</label>
    </div>
    */

    // Get task text
    let textbox = document.getElementById("task-input");
    let taskText = textbox.value;
    textbox.value = "";

    createTask(taskText);
    
}

function removeTask(event) {
    // Get the id of the div to remove
    let checkboxId = event.target.id;
    let idNum = checkboxId.substring(8);
    let taskDiv = document.getElementById("task" + idNum);
    taskDiv.classList.add("remove");

    // Get the task-list container
    let taskList = document.getElementById("task-list");

    // Remove task div from task-list
    setTimeout(function() {
        taskList.removeChild(taskDiv);
        fixTaskColors();
    }, 1000)    
}

function fixTaskColors() {
    let taskList = document.getElementById("task-list");
    for (let i = 0; i < taskList.childElementCount; i++) {
        taskList.children[i].style.backgroundColor = "dodgerblue";
        if (i % 2 == 1) {
            taskList.children[i].style.backgroundColor = "turquoise";
        }
    }
}

function createTask(taskText) {
    // Get tasklist 
    let taskList = document.getElementById("task-list");

    // Generate id number
    let idNum = taskList.childElementCount;

    // Create task div
    let taskDiv = document.createElement("div");
    taskDiv.id = "task" + idNum;
    taskDiv.classList.add("task-item");
    if (idNum % 2 == 1) {
        taskDiv.style.backgroundColor = "turquoise";
    }

    // Create checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox" + idNum;
    checkbox.addEventListener("change", removeTask);

    // Create label
    let label = document.createElement("label");
    label.id = "label" + idNum;

    // Set label text
    label.innerText = taskText;

    // Save task to local storage
    localStorage.setItem(taskDiv.id, taskText);
    console.log(localStorage.length);

    // Add the checkbox the task div
    taskDiv.appendChild(checkbox);

    // Add the label to the task div
    taskDiv.appendChild(label);

    // Add the task div to the list
    taskList.appendChild(taskDiv);
}

function loadTasks() {
    console.log(localStorage.length);
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        console.log(key);
        let taskText = localStorage.getItem(key);
        console.log(taskText);
        createTask(taskText);
    }
}
loadTasks();
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

    // Prevent empty task
    if (taskText == "") {
        alert("Please enter a task");
        return;
    }

    let idNum = generateIdNum();

    createTask(taskText, idNum);

    // Save task to local storage
    localStorage.setItem("task" + idNum, taskText);
    console.log(localStorage.length);
    
}

function generateIdNum() {
    // Start with idNum = 0
    let idNum = 0;

    // Check if a task with that id exists
    while (localStorage.getItem("task" + idNum) != null) {
        idNum++;
    }

    // If it doesn, increment idNum and check again
    return idNum;
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
        localStorage.removeItem(taskDiv.id);
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

function createTask(taskText, idNum) {
    // Get tasklist 
    let taskList = document.getElementById("task-list");

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
        createTask(taskText, key.substring(4));
    }
    fixTaskColors();
}
loadTasks();
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
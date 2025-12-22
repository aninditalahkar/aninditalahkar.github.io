let tasks = [];
let input =document.getElementById("taskInput");
let taskList = document.getElementById("taskList");
let button= document.getElementById("addBtn");
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
button.addEventListener("click", function(){
    let task = input.value;
    if (task === "") {
        alert("Please enter a task");
        return;
    }
    tasks.push(task);
    saveTasks();
    addTaskToList(task);
    input.value = "";
});
    function addTaskToList(task) {
    let li= document.createElement("li");
    let taskText = document.createElement("span");
    taskText.innerText = task;
    taskText.addEventListener("click", function() {
        li.classList.toggle("completed");
    });
    let editBtn = document.createElement("span");
    editBtn.innerText= "✏️";
    editBtn.addEventListener("click", function(event){
        event.stopPropagation();
        let newTask=prompt("Edit task:", taskText.innerText);
        if (newTask !== null && newTask !== "") {
            let index = tasks.indexOf(taskText.innerText);
            tasks[index] = newTask;
            taskText.innerText = newTask;
            saveTasks();
        }
    });

let deleteBtn= document.createElement("span");
deleteBtn.innerText= "❌";
deleteBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    
    tasks = tasks.filter(function (t) {
        return t !== task;
    });
    li.remove();
    saveTasks();
});
li.appendChild(taskText);
li.appendChild(editBtn);
li.appendChild(deleteBtn);

    taskList.appendChild(li);
}
    input.value= "";
function loadTasks() {
    let storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(function (task) {
            addTaskToList(task);
        });
    }
}
loadTasks();
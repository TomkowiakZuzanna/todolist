document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let taskType = document.getElementById("taskType").value;

    console.log("Tytuł:", title);
    console.log("Opis:", description);
    console.log("Typ zadania:", taskType);

    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("task_type", taskType);

    fetch("dodaj_task.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.success) {
            alert("Zadanie dodane!");
            loadTasks(); 
        } else {
            alert("Wystąpił błąd!");
        }
    })
    .catch(error => {
        console.error("Błąd:", error);
    });
});

function loadTasks() {
    
    fetch("zrobic_task.php")
    .then(response => response.json())
    .then(data => {
        let tasksList = document.getElementById("tasksList");
        tasksList.innerHTML = "";
        data.forEach(task => {
            tasksList.innerHTML += `
                <div>
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <p><strong>Typ:</strong> ${task.task_type}</p>
                    <button onclick="deleteTask(${task.id})">Usuń</button>
                </div>
            `;
        });
    });
}

function deleteTask(id) {
    
    fetch(`usun_task.php?id=${id}`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadTasks();
        } else {
            alert("Błąd przy usuwaniu zadania.");
        }
    });
}

loadTasks(); 

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
            let taskElement = document.createElement("div");
            taskElement.classList.add("task");
            taskElement.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p><strong>Typ:</strong> ${task.task_type}</p>
                <button onclick="openEditForm(${task.id}, '${task.title}', '${task.description}', '${task.task_type}')">Edytuj</button>
                <button onclick="deleteTask(${task.id})">Usuń</button>
                
                <h4>Komentarze:</h4>
                <div id="comments-${task.id}">Ładowanie...</div>
                <input type="text" id="commentInput-${task.id}" placeholder="Dodaj komentarz...">
                <button onclick="addComment(${task.id})">Dodaj</button>
            `;

            tasksList.appendChild(taskElement);
            loadComments(task.id);  
        });
    });
}
            /* tasksList.innerHTML += `
                <div class="task">
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <p><strong>Typ:</strong> ${task.task_type}</p>
                    <button onclick="openEditForm(${task.id}, '${task.title}', '${task.description}', '${task.task_type}')">Edytuj</button>
                    <button onclick="deleteTask(${task.id})">Usuń</button>
                    
                    <h4>Komentarze:</h4>
                    <div id="comments-${task.id}"></div>
                    <input type="text" id="commentInput-${task.id}" placeholder="Dodaj komentarz...">
                    <button onclick="addComment(${task.id})">Dodaj</button>
                </div>
            `;
        });
    });
} */

function loadComments(taskId) {
    fetch(`pobierz_komentarz.php?task_id=${taskId}`)
    .then(response => response.json())
    .then(data => {
        let commentsContainer = document.getElementById(`comments-${taskId}`);
        if (commentsContainer) {
            commentsContainer.innerHTML = "";
            data.forEach(comment => {
                commentsContainer.innerHTML += `<p>${comment.comment_text} <small>(${comment.created_at})</small></p>`;
            });
        }
    });
}

function addComment(taskId) {
    let commentText = document.getElementById(`commentInput-${taskId}`).value;
    if (!commentText.trim()) return alert("Wpisz treść komentarza!");

    let formData = new FormData();
    formData.append("task_id", taskId);
    formData.append("comment_text", commentText);

    fetch("dodaj_komentarz.php", { method: "POST", body: formData })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById(`commentInput-${taskId}`).value = "";
            loadComments(taskId);
        } else {
            alert("Błąd dodawania komentarza!");
        }
    });
}


function openEditForm(id, title, description, taskType) {
    document.getElementById("editTaskId").value = id;
    document.getElementById("editTitle").value = title;
    document.getElementById("editDescription").value = description;
    document.getElementById("editTaskType").value = taskType;
    document.getElementById("editFormContainer").style.display = "block";
}

document.getElementById("editTaskForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append("id", document.getElementById("editTaskId").value);
    formData.append("title", document.getElementById("editTitle").value);
    formData.append("description", document.getElementById("editDescription").value);
    formData.append("task_type", document.getElementById("editTaskType").value);

    fetch("edytuj_task.php", { method: "POST", body: formData })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Zadanie zaktualizowane!");
            closeEditForm();
            loadTasks();
        } else {
            alert("Błąd aktualizacji.");
        }
    });
});

function closeEditForm() {
    document.getElementById("editFormContainer").style.display = "none";
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

<?php
    $mysqli = new mysqli("localhost", "root", "", "tasks");

    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    $title = $_POST['title'];
    $description = $_POST['description'];
    $task_type = $_POST['task_type'];

    error_log("Tytuł: " . $title);
    error_log("Opis: " . $description);
    error_log("Typ zadania: " . $task_type);

    $query = "INSERT INTO tasks (title, description, task_type) VALUES (?, ?, ?)";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("sss", $title, $description, $task_type);
    $stmt->execute();

    echo json_encode(['success' => true]);

    $stmt->close();
    $mysqli->close();
?>

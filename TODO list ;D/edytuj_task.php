<?php
    $mysqli = new mysqli("localhost", "root", "", "tasks");

    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    $id = $_POST['id'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    $task_type = $_POST['task_type'];

    $sql = "UPDATE tasks SET title=?, description=?, task_type=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $title, $description, $task_type, $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }

    $conn->close();
?>

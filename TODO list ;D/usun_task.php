<?php
    $id = $_GET['id'];

    $mysqli = new mysqli("localhost", "root", "", "tasks");

    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    $query = "DELETE FROM tasks WHERE id = ?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("i", $id);
    $stmt->execute();

    echo json_encode(['success' => true]);

    $stmt->close();
    $mysqli->close();
?>

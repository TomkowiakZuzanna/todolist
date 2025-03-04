<?php
    $mysqli = new mysqli("localhost", "root", "", "tasks");

    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    $query = "SELECT * FROM tasks";
    $result = $mysqli->query($query);

    $tasks = [];
    while ($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }

    echo json_encode($tasks);

    $mysqli->close();
?>

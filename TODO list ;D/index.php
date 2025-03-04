<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zadania</title>
    <link rel="stylesheet" href="styl1.css">
</head>
<body>
    <h1>ZARZĄDZANIE ZADANIAMI</h1>

    <form id="taskForm">
        <input type="text" id="title" placeholder="Tytuł zadania" required>
        <textarea id="description" placeholder="Opis zadania"></textarea>
        <select id="taskType">
            <option value="Do zrobienia">Do zrobienia</option>
            <option value="W trakcie">W trakcie</option>
            <option value="Zakończone">Zakończone</option>
        </select>
        <button type="submit">Dodaj zadanie</button>
    </form>

    <div id="tasksList">

    </div>

    <script src="script.js"></script>
</body>
</html>

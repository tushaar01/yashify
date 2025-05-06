<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$dbFile = 'comments.db';

// Database create karna agar pehle se na ho
if (!file_exists($dbFile)) {
    $db = new SQLite3($dbFile);
    $db->exec('CREATE TABLE comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        text TEXT NOT NULL,
        date DATETIME DEFAULT CURRENT_TIMESTAMP
    )');
} else {
    $db = new SQLite3($dbFile);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Naya comment save karna
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!empty($input['name']) && !empty($input['text'])) {
        $stmt = $db->prepare('INSERT INTO comments (name, text) VALUES (:name, :text)');
        $stmt->bindValue(':name', trim($input['name']), SQLITE3_TEXT);
        $stmt->bindValue(':text', trim($input['text']), SQLITE3_TEXT);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Database error']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Name and text are required']);
    }
} else {
    // Saare comments fetch karna
    $results = $db->query('SELECT * FROM comments ORDER BY date DESC');
    $comments = [];
    
    while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
        $comments[] = $row;
    }
    
    echo json_encode($comments);
}

$db->close();
?>
<?php
session_start();

$filename = "scores.json";

// Read existing scores
if (file_exists($filename)) {
    $scores = json_decode(file_get_contents($filename), true);
} else {
    $scores = [];
}

// Get incoming data
$data = json_decode(file_get_contents("php://input"), true);
$name = $data['name'];
$score = $data['score'];

// Store new score
$scores[] = ["name" => $name, "score" => $score];

// Sort scores in descending order
usort($scores, function ($a, $b) {
    return $b["score"] - $a["score"];
});

// Save updated scores
file_put_contents($filename, json_encode($scores));

// Get the top 3 winners
$topThree = array_slice($scores, 0, 3);

// Send response
echo json_encode([
    "topThree" => $topThree,
    "yourScore" => ["name" => $name, "score" => $score]
]);
?>

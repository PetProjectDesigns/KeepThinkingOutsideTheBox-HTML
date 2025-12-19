<?php
// Check if the form was submitted using the POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // --- 1. Retrieve and Sanitize Form Data ---

    // Get the 'username' field and escape special characters for security
    $username = isset($_POST['username']) ? htmlspecialchars(trim($_POST['username'])) : '';

    // Get the 'comments' field and escape special characters
    $comments = isset($_POST['comments']) ? htmlspecialchars(trim($_POST['comments'])) : '';

    // Get the 'options' field and escape special characters
    $options = isset($_POST['options']) ? htmlspecialchars($_POST['options']) : '';

    // --- 2. Display the Submitted Data ---

    echo "<!DOCTYPE html>";
    echo "<html lang='en'>";
    echo "<head>";
    echo "    <meta charset='UTF-8'>";
    echo "    <title>Form Submission Result</title>";
    echo "</head>";
    echo "<body>";
    echo "    <h1>Form Submitted Successfully! 🎉</h1>";
    echo "    <p>Here is the data you submitted:</p>";
    echo "    <hr>";

    // Display each piece of data
    echo "    <h2>Submitted Details</h2>";
    echo "    <ul>";
    echo "        <li><strong>Username:</strong> " . (empty($username) ? 'No username provided' : $username) . "</li>";
    echo "        <li><strong>Selected Option:</strong> " . (empty($options) ? 'No option selected' : $options) . "</li>";
    echo "    </ul>";

    echo "    <h3>Comments</h3>";
    // Using nl2br to preserve line breaks in comments when displaying in HTML
    echo "    <p>" . (empty($comments) ? 'No comments provided' : nl2br($comments)) . "</p>";

    echo "    <p><a href='#' onclick='window.history.back();'>Go Back to the Form</a></p>";

    echo "</body>";
    echo "</html>";

} else {
    // If the user tries to access this page directly (not via form submission)
    echo "<!DOCTYPE html>";
    echo "<html lang='en'>";
    echo "<head>";
    echo "    <meta charset='UTF-8'>";
    echo "    <title>Error</title>";
    echo "</head>";
    echo "<body>";
    echo "    <h1>Error: Invalid Request Method</h1>";
    echo "    <p>This page should only be accessed via a form submission.</p>";
    echo "</body>";
    echo "</html>";
}
?>
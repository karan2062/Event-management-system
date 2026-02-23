<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    echo "<pre>";
    print_r($_POST);
    echo "</pre>";
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    
    $sql = "INSERT INTO signin (email, password) VALUES ('$email', '$password')";
    
    if (mysqli_query($conn, $sql)) {
        echo "<script>alert('Registration successful!'); window.location.href='signin.php';</script>";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
    
    mysqli_close($conn);
}
?>

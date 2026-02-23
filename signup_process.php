<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    echo "<pre>";
    print_r($_POST);
    echo "</pre>";
    $firstName = mysqli_real_escape_string($conn, $_POST['firstName']);
    $lastName = mysqli_real_escape_string($conn, $_POST['lastName']);
    $name = $firstName . ' ' . $lastName;
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $phone = mysqli_real_escape_string($conn, $_POST['phone']);
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];
    if ($password !== $confirmPassword) {
        echo "<script>alert('Passwords do not match!'); window.location.href='signup.php';</script>";
        exit();
    }
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $sql = "INSERT INTO signup (name, email, password) VALUES ('$name', '$email', '$hashed_password')";
    if (mysqli_query($conn, $sql)) {
        echo "<script>alert('Sign up successful!'); window.location.href='signup.php';</script>";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
    mysqli_close($conn);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign In - Event Management Site</title>
    <link rel="stylesheet" href="signin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="signin-container">
        <div class="signin-box">
            <div class="logo">
                <img src="Assets/Logo.png" alt="Logo">
            </div>
            <h2>Welcome Back</h2>
            <p class="subtitle">Sign in to your account</p>
            
            <form id="signinForm" action="signin_process.php" method="POST">
                <div class="input-group">
                    <i class="fas fa-envelope"></i>
                    <input type="email" id="email" name="email" placeholder="Email Address" required>
                </div>
                
                <div class="input-group">
                    <i class="fas fa-lock"></i>
                    <input type="password" id="password" name="password" placeholder="Password" required>
                </div>
                
                <div class="options">
                    <label class="remember-me">
                        <input type="checkbox" name="remember">
                        <span>Remember me</span>
                    </label>
                    <a href="#" class="forgot-password">Forgot Password?</a>
                </div>
                
                <button type="submit" class="signin-btn">Sign In</button>
            </form>
            
            <div class="divider">
                <span>or continue with</span>
            </div>
            
            <div class="social-login">
                <button class="social-btn google">
                    <i class="fab fa-google"></i>
                    Google
                </button>
                <button class="social-btn facebook">
                    <i class="fab fa-facebook-f"></i>
                    Facebook
                </button>
            </div>
            
            <p class="signup-link">
                Don't have an account? <a href="signup.php">Sign Up</a>
            </p>
            
            <a href="index.html" class="back-home"><i class="fas fa-arrow-left"></i> Back to Home</a>
        </div>
    </div>
    
    <!-- JavaScript removed for pure PHP form submission -->
</body>
</html>

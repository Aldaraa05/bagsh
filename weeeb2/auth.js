// auth.js - Authentication handling for both signup and signin

// User data storage (in a real app, this would be a backend API)
const users = JSON.parse(localStorage.getItem('users')) || [];

// DOM Elements
const signupForm = document.getElementById('signup-form');
const signinForm = document.getElementById('signin-form');

// Sign Up Functionality
if (signupForm) {
    signupForm.addEventListener('submit', handleSignUp);
}

// Sign In Functionality
if (signinForm) {
    signinForm.addEventListener('submit', handleSignIn);
}

// Password reset link
const forgotPasswordLink = document.getElementById('forgot-password');
if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', handleForgotPassword);
}

// Handle Sign Up
function handleSignUp(e) {
    e.preventDefault();
    
    // Reset errors
    document.querySelectorAll('.error').forEach(error => {
        error.style.display = 'none';
    });

    // Get form values
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const terms = document.getElementById('terms').checked;

    // Validation flags
    let isValid = true;

    // Validate fullname
    if (fullname === '') {
        document.getElementById('fullname-error').style.display = 'block';
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
    }

    // Check if email already exists
    if (users.some(user => user.email === email)) {
        document.getElementById('email-error').textContent = 'Энэ и-мэйл хаяг аль хэдийн бүртгэгдсэн байна';
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
    }

    // Validate phone (Mongolian phone numbers)
    const phoneRegex = /^[0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
        document.getElementById('phone-error').style.display = 'block';
        isValid = false;
    }

    // Validate subject
    if (subject === '') {
        document.getElementById('subject-error').style.display = 'block';
        isValid = false;
    }

    // Validate password
    if (password.length < 8) {
        document.getElementById('password-error').style.display = 'block';
        isValid = false;
    }

    // Validate password match
    if (password !== confirmPassword) {
        document.getElementById('confirm-password-error').style.display = 'block';
        isValid = false;
    }

    // Validate terms
    if (!terms) {
        document.getElementById('terms-error').style.display = 'block';
        isValid = false;
    }

    // If valid, create user
    if (isValid) {
        const newUser = {
            fullname,
            email,
            phone,
            subject,
            password, // In a real app, you would hash this
            role: 'teacher' // Assuming this is for teachers only
        };

        // Add to users array
        users.push(newUser);
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Show success message
        alert('Бүртгэл амжилттай! Таны мэдээллийг хүлээн авлаа.');
        
        // Redirect to sign in page
        window.location.href = '/weeeb2/SignIn.html';
    }
}

// Handle Sign In
function handleSignIn(e) {
    e.preventDefault();
    
    // Get form values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember') ? document.getElementById('remember').checked : false;

    // Find user
    const user = users.find(u => u.email === email);
    
    if (!user) {
        alert('И-мэйл хаяг эсвэл нууц үг буруу байна');
        return;
    }

    // Check password (in a real app, you would compare hashed passwords)
    if (user.password !== password) {
        alert('И-мэйл хаяг эсвэл нууц үг буруу байна');
        return;
    }

    // If "Remember me" is checked, store user email in localStorage
    if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
    } else {
        localStorage.removeItem('rememberedEmail');
    }

    // Store current user session
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    
    // Show success message
    alert('Амжилттай нэвтэрлээ!');
    
    // Redirect to dashboard or home page
    window.location.href = '/weeeb2/index.html';
}

// Handle Forgot Password
function handleForgotPassword(e) {
    e.preventDefault();
    const email = prompt('Бүртгэлтэй и-мэйл хаягаа оруулна уу:');
    
    if (email) {
        const user = users.find(u => u.email === email);
        
        if (user) {
            // In a real app, you would send a password reset email
            alert(`Нууц үг сэргээх линк ${email} хаяг руу илгээгдлээ.`);
        } else {
            alert('Энэ и-мэйл хаяг бүртгэлгүй байна.');
        }
    }
}

// Check if there's a remembered email on page load
document.addEventListener('DOMContentLoaded', function() {
    if (signinForm) {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            document.getElementById('email').value = rememberedEmail;
            if (document.getElementById('remember')) {
                document.getElementById('remember').checked = true;
            }
        }
    }
    
    // Check if user is already logged in
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser && window.location.pathname.includes('SignIn.html')) {
        window.location.href = '/weeeb2/index.html';
    }
});
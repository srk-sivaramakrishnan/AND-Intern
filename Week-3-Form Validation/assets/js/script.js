document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    var nameError = document.getElementById('nameError');
    var phoneError = document.getElementById('phoneError');
    var emailError = document.getElementById('emailError');
    var usernameError = document.getElementById('usernameError');
    var passwordError = document.getElementById('passwordError');
    var successMessage = document.getElementById('successMessage');
  
    var valid = true;
  
    if (!name) {
      nameError.style.display = 'block';
      valid = false;
    } else {
      nameError.style.display = 'none';
    }
  
    var phoneRegex = /^\d+$/;
    if (!phone || !phoneRegex.test(phone)) {
      phoneError.style.display = 'block';
      valid = false;
    } else {
      phoneError.style.display = 'none';
    }
  
    if (!email.includes('@') || !email.endsWith('.com')) {
      emailError.style.display = 'block';
      valid = false;
    } else {
      emailError.style.display = 'none';
    }
  
    if (username.length < 10) {
      usernameError.style.display = 'block';
      valid = false;
    } else {
      usernameError.style.display = 'none';
    }
  
    var passwordRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (password.length < 8 || password.length > 15 || !passwordRegex.test(password)) {
      passwordError.style.display = 'block';
      valid = false;
    } else {
      passwordError.style.display = 'none';
    }
  
    if (valid) {
      successMessage.style.display = 'block';
    } else {
      successMessage.style.display = 'none';
    }
  });
  
  document.getElementById('togglePassword').addEventListener('click', function() {
    var passwordField = document.getElementById('password');
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      this.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
      passwordField.type = 'password';
      this.classList.replace('fa-eye-slash', 'fa-eye');
    }
  });

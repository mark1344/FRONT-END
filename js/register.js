function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Función para registrar el nuevo usuario
function registerUser() {
  var isValid = true;
  var username = document.getElementById("newUser").value.trim();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("newPassword").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var userError = document.getElementById("user-error");
  var emailError = document.getElementById("email-error");
  var passwordError = document.getElementById("password-error");
  var confirmPasswordError = document.getElementById("confirm-password-error");

  // Limpiar errores previos
  userError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";
  document.getElementById("newUser").classList.remove("error");
  document.getElementById("email").classList.remove("error");
  document.getElementById("newPassword").classList.remove("error");
  document.getElementById("confirmPassword").classList.remove("error");

  // Validar campos
  if (!username) {
    userError.textContent = "Por favor, ingresa un usuario.";
    document.getElementById("newUser").classList.add("error");
    isValid = false;
  }
  if (!email) {
    emailError.textContent = "Por favor, ingresa un correo electrónico.";
    document.getElementById("email").classList.add("error");
    isValid = false;
  } else if (!validateEmail(email)) {
    emailError.textContent = "Por favor, ingresa un correo electrónico válido.";
    document.getElementById("email").classList.add("error");
    isValid = false;
  }
  if (!password) {
    passwordError.textContent = "Por favor, ingresa una contraseña.";
    document.getElementById("newPassword").classList.add("error");
    isValid = false;
  }
  if (password !== confirmPassword) {
    confirmPasswordError.textContent = "Las contraseñas no coinciden.";
    document.getElementById("confirmPassword").classList.add("error");
    isValid = false;
  }

  // Solo proceder si todos los campos son válidos
  if (!isValid) {
    return;
  }

  // Crear un objeto de usuario para almacenar en localStorage
  var user = {
    username: username,
    email: email,
    password: password,
    role: "Visualizador", // Asignar rol de 'viewer' por defecto
  };

  // Guardar datos y confirmar registro
  localStorage.setItem(username, JSON.stringify(user)); // Clave basada en el nombre de usuario

  alert("Registro exitoso. Ahora puedes iniciar sesión.");
  window.location.href = "../login.html"; // Redirigir al usuario al login
}

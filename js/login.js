// Función para validar las credenciales de inicio de sesión
function validateLogin() {
  var isValid = true;
  var enteredUsername = document.getElementById("user").value.trim();
  var enteredPassword = document.getElementById("password").value;
  var usernameError = document.getElementById("user-error");
  var passwordError = document.getElementById("password-error");

  // Limpiar errores previos
  usernameError.textContent = "";
  passwordError.textContent = "";
  document.getElementById("user").classList.remove("error");
  document.getElementById("password").classList.remove("error");

  // Validar que ningún campo esté vacío
  if (!enteredUsername) {
    usernameError.textContent = "Por favor, ingresa tu usuario.";
    document.getElementById("user").classList.add("error");
    isValid = false;
  }

  if (!enteredPassword) {
    passwordError.textContent = "Por favor, ingresa tu contraseña.";
    document.getElementById("password").classList.add("error");
    isValid = false;
  }
  // Solo continuar con la validación si todos los campos están llenos
  if (!isValid) {
    return;
  }

  // Aquí iría la verificación con localStorage o la lógica de verificación
  var storedUsername = localStorage.getItem("username");
  var storedPassword = localStorage.getItem("password");

  if (
    enteredUsername === storedUsername &&
    enteredPassword === storedPassword
  ) {
    alert("Inicio de sesión exitoso.");
    // Redirigir al usuario a la página principal
    window.location.href = "../account.html";
  } else {
    usernameError.textContent = "Nombre de usuario o contraseña incorrecta.";
    document.getElementById("user").classList.add("error");
    document.getElementById("password").classList.add("error");
  }
}

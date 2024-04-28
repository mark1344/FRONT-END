// Código para inicializar el usuario administrador si no existe
if (!localStorage.getItem("admin")) {
  // Asegúrate de usar la clave "admin" aquí
  const adminUser = {
    username: "admin",
    password: "adminpass",
    role: "admin",
  };
  localStorage.setItem("admin", JSON.stringify(adminUser)); // Usar "admin" como clave
}

// Función para validar las credenciales de inicio de sesión
function validateLogin() {
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
    return; // Detener la función si hay campos vacíos
  }

  if (!enteredPassword) {
    passwordError.textContent = "Por favor, ingresa tu contraseña.";
    document.getElementById("password").classList.add("error");
    return; // Detener la función si hay campos vacíos
  }

  // Recuperar los datos del usuario desde localStorage
  var userData = localStorage.getItem(enteredUsername);
  var user = userData ? JSON.parse(userData) : null;

  // Asegúrate de que la clave que usas aquí coincide con la clave que usaste al almacenar los datos
  var adminData = localStorage.getItem("admin");
  var admin = adminData ? JSON.parse(adminData) : null;

  if (user && user.password === enteredPassword) {
    alert(
      "Inicio de sesión exitoso. Bienvenido, " +
        user.username +
        " (" +
        user.role +
        ")."
    );
    localStorage.setItem("currentUser", JSON.stringify(user)); // Guardar los datos del usuario actual
    // Redirigir al usuario a la página adecuada según su rol
    if (user.role === "admin") {
      window.location.href = "../admin.html";
    } else {
      window.location.href = "../viewer.html";
    }
  } else {
    usernameError.textContent = "Nombre de usuario o contraseña incorrecta.";
    document.getElementById("user").classList.add("error");
    document.getElementById("password").classList.add("error");
  }
}

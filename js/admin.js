window.onload = function () {
  var adminContent = document.getElementById("adminContent"); // El contenido exclusivo para administradores

  try {
    var userData = localStorage.getItem("currentUser"); // Recuperar los datos del usuario
    if (!userData) {
      throw new Error("No hay datos de sesión disponibles."); // Lanzar un error si no hay datos
    }

    var user = JSON.parse(userData); // Parsear los datos del usuario
    if (user.role !== "admin") {
      // Ocultar el contenido de admin si existe y el usuario no es administrador
      if (adminContent) {
        adminContent.style.display = "none";
      }
      throw new Error(
        "Acceso denegado. No tienes permisos para acceder a esta página."
      ); // Lanzar un error si no es admin
    } else {
      // Si el usuario es administrador, asegurarse de que el contenido de admin se muestre
      if (adminContent) {
        adminContent.style.display = "block";
      }
    }
  } catch (error) {
    alert(error.message); // Mostrar mensaje de error
    setTimeout(function () {
      window.location.href = "../FRONT-END/login.html"; // Redirigir a login después de mostrar el alerta
    }, 1); // Retraso para mejorar la legibilidad del mensaje
  }
};
function logout() {
  // Limpiar la sesión actual
  localStorage.removeItem("currentUser");

  // Redirigir al usuario a la página de inicio
  window.location.href = "index.html";
}

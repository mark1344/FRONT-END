window.onload = function () {
  var viewerContent = document.getElementById("viewerContent"); // El contenido exclusivo para visualizadores

  try {
    var userData = localStorage.getItem("currentUser"); // Recuperar los datos del usuario
    if (!userData) {
      throw new Error("No hay datos de sesión disponibles."); // Lanzar un error si no hay datos
    }

    var user = JSON.parse(userData); // Parsear los datos del usuario
    if (user.role !== "Visualizador") {
      // Ocultar el contenido de visualizador si existe y el usuario no es visualizador
      if (viewerContent) {
        viewerContent.style.display = "none";
      }
      throw new Error(
        "Acceso denegado. No tienes permisos para acceder a esta página."
      ); // Lanzar un error si no es visualizador
    } else {
      // Si el usuario es visualizador, asegurarse de que el contenido de visualizador se muestre
      if (viewerContent) {
        viewerContent.style.display = "block";
      }
    }
  } catch (error) {
    alert(error.message); // Mostrar mensaje de error
    setTimeout(function () {
      window.location.href = "../login.html"; // Redirigir a login después de mostrar el alerta
    }, 1); // Retraso para mejorar la legibilidad del mensaje
  }
};

function logout() {
  // Limpiar la sesión actual
  localStorage.removeItem("currentUser");

  // Redirigir al usuario a la página de inicio
  window.location.href = "index.html";
}

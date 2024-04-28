window.onload = function () {
  try {
    var userData = localStorage.getItem("currentUser"); // Recuperar los datos del usuario
    if (!userData) {
      throw new Error("No hay datos de sesión disponibles."); // Lanzar un error si no hay datos
    }

    var user = JSON.parse(userData); // Parsear los datos del usuario
    if (user.role !== "admin") {
      throw new Error(
        "Acceso denegado. No tienes permisos para acceder a esta página."
      ); // Lanzar un error si no es admin
    }
  } catch (error) {
    alert(error.message); // Mostrar mensaje de error
    setTimeout(function () {
      window.location.href = "../login.html"; // Redirigir a login después de mostrar el alerta
    }, 1); // Retraso de 2 segundos para mejorar la legibilidad del mensaje
  }
};

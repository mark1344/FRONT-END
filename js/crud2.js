window.onload = function () {
  displayUserData();
  displayViewerContents();
  displayProductInfo();
  displayBasicReports();
};

function displayViewerContents() {
  var contentList = document.getElementById("contentViewerList");
  contentList.innerHTML = ""; // Limpiar la lista antes de agregar contenido nuevo

  Object.keys(localStorage).forEach(function (key) {
    if (key.startsWith("content-")) {
      // Solo mostrar contenido con el prefijo "content-"
      try {
        var content = JSON.parse(localStorage.getItem(key));
        var contentElement = document.createElement("div");
        contentElement.innerHTML = `
          <h3>${content.title}</h3>
          <p>${content.description}</p>
        `;
        contentList.appendChild(contentElement);
      } catch (e) {
        console.error("Error parsing content from localStorage", e);
      }
    }
  });
}
function displayUserData() {
  var userData = JSON.parse(localStorage.getItem("currentUser"));
  var userDataDisplay = document.getElementById("userDataDisplay");
  if (userData) {
    userDataDisplay.innerHTML = `
            <p>Nombre de Usuario: ${userData.username}</p>
            <p>Email: ${userData.email}</p>
            <p>Rol: ${userData.role}</p>
        `;
  } else {
    userDataDisplay.innerHTML = "<p>No se encontraron datos de usuario.</p>";
  }
}
function displayProductInfo() {
  var productsInfo = document.getElementById("viewInformation");
  productsInfo.innerHTML = ""; // Limpiar antes de agregar nuevos elementos

  Object.keys(localStorage).forEach(function (key) {
    if (key.startsWith("content-")) {
      var content = JSON.parse(localStorage.getItem(key));
      var productElement = document.createElement("div");
      productElement.innerHTML = `
                <h3>${content.title}</h3>
                <p>${content.description}</p>
                <!-- Puedes añadir más detalles como precio si están disponibles -->
            `;
      productsInfo.appendChild(productElement);
    }
  });
}
function displayBasicReports() {
  var reportsInfo = document.getElementById("basicReports");
  reportsInfo.innerHTML = ""; // Limpiar contenido previo

  // Ejemplo simple, deberías ajustar según cómo guardes los reportes
  Object.keys(localStorage).forEach(function (key) {
    if (key.startsWith("report-")) {
      var report = JSON.parse(localStorage.getItem(key));
      var reportElement = document.createElement("div");
      reportElement.innerHTML = `
                <h4>${report.title}</h4>
                <p>${report.summary}</p>
            `;
      reportsInfo.appendChild(reportElement);
    }
  });
}

function showCreateUserForm() {
  document.getElementById("userForm").style.display = "block";
}

function saveUser() {
  var isEditing = document.getElementById("isEditing").value;
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var role = document.getElementById("role").value;

  var user = {
    username: username,
    email: email,
    password: password,
    role: role,
  };

  if (isEditing) {
    // Estamos editando, así que borramos el antiguo si el nombre de usuario cambió
    if (isEditing !== username) {
      localStorage.removeItem(isEditing);
    }
  }

  localStorage.setItem(username, JSON.stringify(user)); // Guardar o actualizar el usuario
  alert("Usuario " + (isEditing ? "actualizado" : "guardado") + " con éxito");
  clearForm();
  displayUsers();
}

function cancelEdit() {
  clearForm(); // Llamar a clearForm que ahora también ocultará el formulario
}

function displayUsers() {
  var userList = document.getElementById("userList");
  userList.innerHTML = ""; // Limpiar la lista existente primero

  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var user = JSON.parse(localStorage.getItem(key));

    if (key !== "currentUser" && key !== "admin") {
      var userElement = document.createElement("div");
      userElement.innerHTML = `
                ${key} - ${user.role}
                <button onclick='editUser("${key}")'>Editar</button>
                <button onclick='deleteUser("${key}")'>Eliminar</button>
            `;
      userList.appendChild(userElement);
    }
  }
}

function editUser(username) {
  var user = JSON.parse(localStorage.getItem(username));
  document.getElementById("isEditing").value = username; // Indicar que estamos editando
  document.getElementById("username").value = user.username;
  document.getElementById("email").value = user.email;
  document.getElementById("password").value = user.password;
  document.getElementById("role").value = user.role;
  showCreateUserForm();
}

function deleteUser(username) {
  localStorage.removeItem(username);
  alert("Usuario eliminado");
  displayUsers(); // Actualizar la lista después de eliminar
}

function clearForm() {
  document.getElementById("isEditing").value = "";
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("role").value = "viewer";
  document.getElementById("userForm").style.display = "none";
}

// Funciones para gestionar contenido
function showCreateContentForm() {
  document.getElementById("contentForm").style.display = "block";
  document.getElementById("contentId").value = ""; // Limpiar ID para asegurar que es creación
}

function saveContent() {
  var contentId = document.getElementById("contentId").value;
  var title = document.getElementById("contentTitle").value;
  var description = document.getElementById("contentDescription").value;

  var isNewContent = !contentId;
  contentId = contentId || "content-" + new Date().getTime().toString(); // Agregar prefijo "content-"

  var content = {
    id: contentId,
    title: title,
    description: description,
  };

  localStorage.setItem(contentId, JSON.stringify(content)); // Guardar usando el ID con prefijo
  alert(
    "Contenido " + (isNewContent ? "guardado" : "actualizado") + " con éxito"
  );
  clearContentForm();
  displayContents();
}

function displayContents() {
  var contentList = document.getElementById("contentList");
  contentList.innerHTML = ""; // Limpiar cualquier contenido existente primero

  Object.keys(localStorage).forEach(function (key) {
    try {
      var content = JSON.parse(localStorage.getItem(key));
      // Asegurarnos de que estamos mostrando solo contenido, podría necesitar una mejor forma de filtrar
      if (content && content.title && content.description) {
        var contentElement = document.createElement("div");
        contentElement.innerHTML = `
                    <h3>${content.title}</h3>
                    <p>${content.description}</p>
                    <button onclick='editContent("${content.id}")'>Editar</button>
                    <button onclick='deleteContent("${content.id}")'>Eliminar</button>
                `;
        contentList.appendChild(contentElement);
      }
    } catch (e) {
      console.error("Error parsing content from localStorage", e);
    }
  });
}

function editContent(id) {
  var content = JSON.parse(localStorage.getItem(id));
  document.getElementById("contentId").value = content.id;
  document.getElementById("contentTitle").value = content.title;
  document.getElementById("contentDescription").value = content.description;
  showCreateContentForm();
}

function deleteContent(id) {
  localStorage.removeItem(id);
  alert("Contenido eliminado");
  displayContents();
}

function clearContentForm() {
  document.getElementById("contentForm").style.display = "none";
  document.getElementById("contentId").value = ""; // Asegurarse de limpiar el ID
  document.getElementById("contentTitle").value = "";
  document.getElementById("contentDescription").value = "";
}
function cancelContentEdit() {
  clearContentForm();
}

// Función de carga inicial
window.onload = function () {
  displayUsers();
  displayContents();
};

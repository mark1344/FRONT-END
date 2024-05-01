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

// Initial display of users
window.onload = function () {
  displayUsers();
};

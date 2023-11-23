// Después de iniciar sesión
var tipoUsuario = sessionStorage.getItem('tipoUsuario');
console.log(tipoUsuario);
if (tipoUsuario == 'cocinero') {
  // Redirigir a una página de acceso denegado o realizar otras acciones
  window.location.href = 'cocinero.html';
}
else if(tipoUsuario == 'mesero') {
  window.location.href = 'mesero.html';
}

// Initial config
// This is not "real security", API Keys are
// able to authenticate users, anything else :D
const firebaseConfig = {
    apiKey: "AIzaSyBCn0O_5EpizNvJzuWKWzhMjYuOjSqMUXQ",
    authDomain: "lacafeta2.firebaseapp.com",
    projectId: "lacafeta2",
    storageBucket: "lacafeta2.appspot.com",
    messagingSenderId: "757166880460",
    appId: "1:757166880460:web:38714910c92dfbcf98b469"
  };
    
    firebase.initializeApp(firebaseConfig);
    


//REGISTRO DE USUARIOS


// Obtener referencia al servicio de autenticación
var auth = firebase.auth();

// Obtener referencia al servicio de Firestore
var db = firebase.firestore();

// Referencia al botón de registro
var btnSignUp = document.getElementById('btnSignUp');

// Agregar un evento de clic al botón
btnSignUp.addEventListener('click', function () {
  // Obtener valores del formulario
  var nombre = document.getElementById('nombre').value;
  var apellidos = document.getElementById('apellidos').value;
  var email = document.getElementById('usuario').value;
  var password = document.getElementById('clave').value;
  var tipoUsuario = document.getElementById('usuarioTipo').value;

  // Validar campos vacíos
  if (nombre === '' || apellidos === '' || email === '' || password === '' || tipoUsuario === '#') {
    alert('Por favor, completa todos los campos.');
    return;
  }

  // Crear usuario en Firebase
  auth.createUserWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      // Registro exitoso
      console.log('Usuario registrado exitosamente:', userCredential.user);

      // Guardar datos adicionales en Firestore
      db.collection('usuarios').doc(userCredential.user.uid).set({
        nombre: nombre,
        apellidos: apellidos,
        email: email,
        tipoUsuario: tipoUsuario
      })
        .then(function () {
          console.log('Datos adicionales guardados en Firestore.');
        })
        .catch(function (error) {
          console.error('Error al guardar datos adicionales:', error);
        });

      alert('Usuario registrado exitosamente');

      // Vaciar campos después del registro
      document.getElementById('nombre').value = '';
      document.getElementById('apellidos').value = '';
      document.getElementById('usuario').value = '';
      document.getElementById('clave').value = '';
      document.getElementById('usuarioTipo').value = '#';
    })
    .catch(function (error) {
      // Manejar errores durante el registro
      console.error('Error al registrar usuario:', error.message);
      alert('Error al registrar usuario: ' + error.message);
    });
});


//TABLA

// Referencia al contenedor de la tabla
var tablaUsuarios = document.getElementById('tablaUsuarios');

// Configurar un observador en tiempo real para la colección 'usuarios'
db.collection('usuarios').onSnapshot((snapshot) => {
    // Limpiar la tabla antes de actualizarla
    tablaUsuarios.innerHTML = '';

    // Iterar a través de los documentos de la colección
    snapshot.forEach((doc) => {
        // Obtener datos del documento
        var usuario = doc.data();

        // Crear una nueva fila en la tabla
        var fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.apellidos}</td>
            <td>${usuario.email}</td>
            <td>${usuario.tipoUsuario}</td>
        `;

        // Agregar la fila al cuerpo de la tabla
        tablaUsuarios.appendChild(fila);
    });
});




//ELIMINAR



// Referencia al contenedor de la tabla
var tablaUsuarios = document.getElementById('tablaUsuarios');

// Configurar un observador en tiempo real para la colección 'usuarios'
db.collection('usuarios').onSnapshot((snapshot) => {
    // Limpiar la tabla antes de actualizarla
    tablaUsuarios.innerHTML = '';

    // Iterar a través de los documentos de la colección
    snapshot.forEach((doc) => {
        // Obtener datos del documento
        var usuario = doc.data();
        var uid = doc.id; // Obtener el ID del documento

        // Crear una nueva fila en la tabla
        var fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.apellidos}</td>
            <td>${usuario.email}</td>
            <td>${usuario.tipoUsuario}</td>
            <td>
                <button type="button" class="btn btn-danger btn-sm" data-uid="${uid}">Eliminar</button>
            </td>
        `;

        // Agregar la fila al cuerpo de la tabla
        tablaUsuarios.appendChild(fila);
    });

    // Asignar eventos onclick a los botones de eliminar
    document.querySelectorAll('.btn-danger').forEach(btn => {
        btn.addEventListener('click', function () {
            var uid = this.getAttribute('data-uid');
            eliminarUsuario(uid);
        });
    });
});



// Función para eliminar un usuario
function eliminarUsuario(uid) {
  var user = auth.currentUser;

  user.delete()
    .then(function () {
      console.log('Usuario eliminado de Firebase Authentication');
    })
    .catch(function (error) {
      console.error('Error al eliminar usuario de Firebase Authentication:', error);
    });

  db.collection('usuarios').doc(uid).delete()
    .then(function () {
      console.log('Usuario eliminado de Firestore');
    })
    .catch(function (error) {
      console.error('Error al eliminar usuario de Firestore:', error);
    });
}
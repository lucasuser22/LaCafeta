// Inicialización de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBCn0O_5EpizNvJzuWKWzhMjYuOjSqMUXQ",
  authDomain: "lacafeta2.firebaseapp.com",
  projectId: "lacafeta2",
  storageBucket: "lacafeta2.appspot.com",
  messagingSenderId: "757166880460",
  appId: "1:757166880460:web:38714910c92dfbcf98b469"
};

firebase.initializeApp(firebaseConfig);

// Obtener referencia al servicio de Firestore
var db = firebase.firestore();

//LOGUEO

// Código de inicio de sesión
document.getElementById('btnLogin').addEventListener('click', function() {
  var email = document.loginForm.email.value;
  var password = document.loginForm.password.value;

  if (email === '' || password === '') {
    alert('Por favor, completa todos los campos.');
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      // El usuario ha iniciado sesión correctamente
      var user = userCredential.user;
      var uid = user.uid;

      // Consulta Firestore para obtener información adicional del usuario
      db.collection('usuarios').doc(uid).get()
        .then(function(doc) {
          if (doc.exists) {
            var tipoUsuario = doc.data().tipoUsuario;

            // Redirige a la página según el tipo de usuario
            switch (tipoUsuario) {
              case 'administrador':
                window.location.href = 'gestion.html';
                break;
              case 'mesero':
                window.location.href = 'mesero.html';
                break;
              case 'cocinero':
                window.location.href = 'cocinero.html';
                break;
              default:
                // Tipo de usuario desconocido o no manejado
                console.error('Tipo de usuario desconocido:', tipoUsuario);
                // Puedes redirigir a una página por defecto o mostrar un mensaje de error
                break;
            }
          } else {
            console.error('No se encontró información adicional del usuario');
          }
        })
        .catch(function(error) {
          console.error('Error al obtener información adicional del usuario:', error);
        });
    })
    .catch(function(error) {
      // Manejar errores durante el inicio de sesión
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('Error durante el inicio de sesión:', errorCode, errorMessage);
      alert('Credenciales incorrectas: ');
    });

  document.getElementById('email').value = '';
  document.getElementById('clave').value = '';
});

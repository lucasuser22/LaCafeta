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
  
  
  
  //LOGUEO
  
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
        console.log('Usuario ha iniciado sesión:', user);
        // Puedes redirigir a otra página o realizar otras acciones necesarias después del inicio de sesión
        window.location.href = 'gestion.html';
      })
      .catch(function(error) {
        // Manejar errores durante el inicio de sesión
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error('Error durante el inicio de sesión:', errorMessage);
        alert('Credenciales incorrectas');
      });
    
      document.getElementById('email').value = '';
      document.getElementById('clave').value = '';
      
  });
  
  
  
  
  
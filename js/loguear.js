function loguear() {
    let user = document.getElementById("usuario");
    let password = document.getElementById("clave");

    if (user.value == "administrador" && password.value == "admini") {
        window.location = "index/gestion.html";
        user.value = "";
        password.value = "";
        
    }
    else if(user.value == "cocinero" && password.value == "coock") {
        window.location = "../cocinero.html";
        user.value = "";
    }
    else if (user.value == "" || password.value == "") {
        alert("Campos vacíos");
    }
    else {
        alert("Datos incorrectos");
    }

    
}

function ocultarBoton() {
    var boton = document.getElementById("boton-login");
    boton.style.display = "none";
  }


function loguear() {

    let user = document.getElementById("usuario");
    let password = document.getElementById("clave");

    if (user.value == "administrador" && password.value == "admini") {
        window.location = "gestion.html" || "../LaCafeta/gestion.html";
        user.value = "";
        password.value == "";
    }
    else if (user.value == "mesero" && password.value == "ordenes") {
        window.location = "mesero.html" || "../LaCafeta/mesero.html";
        user.value = "";
        password.value == "";
    }
    else if (user.value == "cocinero" && password.value == "coock") {
        window.location = "cocinero.html" || "../cocinero/mesero.html";
        user.value = "";
        password.value == "";
    }
    else if (user.value == "" || password.value == "") {
        alert("Campos vacíos");
    }
    else {
        alert("Datos incorrectos");
    }


}


/*
function ocultarBoton() {
    var boton = document.getElementById("gestion-menu");
    boton.style.display = "none";
}

*/


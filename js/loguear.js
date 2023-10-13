function loguear() {
    let user = document.getElementById("usuario");
    let password = document.getElementById("clave");

    if (user.value == "administrador" && password.value == "admini") {
        //window.location = "../LaCafeta/gestion.html" || "LaCafeta/gestion.html";
        window.location = "LaCafeta/gestion.html"
        user.value = "";
    }
    else if (user.value == "cocinero" && password.value == "coock") {
        window.location = "../gestion.html";
        user.value = "";
        password.value == "";
    }
    else if (user.value == "mesero" && password.value == "pedido") {
        window.location = "../gestion.html";
        user.value = "";
        password == "";
    }
    else if (user.value == "" || password.value == "") {
        alert("Campos vacíos");
    }
    else {
        alert("Datos incorrectos");
    }


}

function ocultarBoton() {
    var boton = document.getElementById("#");
    boton.style.display = "none";
}
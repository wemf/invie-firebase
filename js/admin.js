var ref = firebase.database().ref("usuario");
var refGuitarras = firebase.database().ref("guitarras");
var nombre = document.getElementById("nombre");
var precio = document.getElementById("precio");
var descripcion = document.getElementById("descripcion");
var tipo = document.getElementById("tipo");
var imagen = document.getElementById("imagen");

firebase.auth().onAuthStateChanged(function (user) {
    if (user){
        console.log(user);
    }
    else {
        window.location.href = "index.html";
    }
});

function nuevaGuitarra() {
    event.preventDefault();
    var object = {
        nombre: nombre.value,
        descripcion: descripcion.value,
        tipo: tipo.value,
        precio: precio.value
    }
    if (object.tipo !== "normal" && object.tipo !== "vip") {
        alert("El tipo debe ser normal o vip");
        return;
    }
    subirGuitarra(object);
}

function subirGuitarra(guitarra) {
    refGuitarras.child(guitarra.tipo).push(guitarra);
    console.log("subida correctamente");
}
const ref = firebase.database().ref("usuario");

const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');
const btnEditar = document.getElementById('perfilEditar');
const cancelEditar = document.getElementById('cancelForm');

var usuario = {};
const datosPerfil = document.getElementById("datosPerfil");
const formularioPerfil = document.getElementById("formularioPerfil");

function llenarInformacion(data) {
    let perfilNombre = document.getElementById("perfilNombre");
    let perfilEmail = document.getElementById("perfilEmail");
    let perfilTelefono = document.getElementById("perfilTelefono");
    let perfilDireccion = document.getElementById("perfilDireccion");
    perfilNombre.innerHTML = data.nombre;
    perfilEmail.innerHTML = data.email;
    perfilTelefono.innerHTML = data.telefono;
    perfilDireccion.innerHTML = data.direccion.calle + " " + data.direccion.interior + " " + data.direccion.colonia + " CP: " + data.direccion.cp;
}

function leerInformacion(user) {
    usuario = user;
    ref.child(user.uid).on('value', function (data) {
        llenarInformacion(data.val());
    });
}
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        btnLogin.style.display = 'none';
        btnLogout.style.display = 'block';
        leerInformacion(user);
    } else {
        window.location.href = "index.html";
    }
});

// Event Listeners

btnLogout.addEventListener('click', (evt) => {
    btnLogin.style.display = 'block';
    btnLogout.style.display = 'none';
    firebase.auth().signOut();
});

perfilEditar.addEventListener('click', function () {  
    datosPerfil.style.display = "none";
    formularioPerfil.style.display = "block";
});

cancelEditar.addEventListener('click', function () {
    datosPerfil.style.display = "block";
    formularioPerfil.style.display = "none";
});

function editarDatos() {
    event.preventDefault();

    let nombreForm = document.getElementById("nombreForm");
    let emailForm = document.getElementById("emailForm");
    let telefonoForm = document.getElementById("telefonoForm");
    let calleForm = document.getElementById("calleForm");
    let interiorForm = document.getElementById("interiorForm");
    let coloniaForm = document.getElementById("coloniaForm");
    let cpForm = document.getElementById("cpForm");
    let obj = {
        nombre: nombreForm.value,
        email: emailForm.value,
        telefono: telefonoForm.value,
        direccion: {
            calle: calleForm.value,
            interior: interiorForm.value,
            colonia: coloniaForm.value,
            cp: cpForm.value
        }
    }
    ref.child(usuario.uid).update(obj).then(function () {
        datosPerfil.style.display = "block";
        formularioPerfil.style.display = "none";
    });
}
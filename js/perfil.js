const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');
const ref = firebase.database().ref("usuario");
var usuario = {};

function llenarInformacion(nombre, email) {
    let perfilNombre = document.getElementById("perfilNombre");
    let perfilEmail = document.getElementById("perfilEmail");
    perfilNombre.innerHTML = nombre;
    perfilEmail.innerHTML = email;
}

function leerInformacion(user) {
    ref.child(user.uid).on('value', function (data) {
        llenarInformacion(data.val().nombre, data.val().email);
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
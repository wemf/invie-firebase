const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');
var ref = firebase.database().ref("usuario");
var usuario = {};

function leerInformacion (user) {
    ref.child(user.uid).once('value', function (data) {
        console.log(data.val());
    });
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        btnLogin.style.display = 'none';
        btnLogout.style.display = 'block';
        leerInformacion(user);
    } else {
        btnLogin.style.display = 'block';
        btnLogout.style.display = 'none';
    }
});

// Event Listeners
btnLogout.addEventListener('click', (evt) => {
    btnLogin.style.display = 'block';
    btnLogout.style.display = 'none';
    firebase.auth().signOut();
});

btnLogin.addEventListener('click', (evt) => {
    evt.preventDefault();
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile');
    firebase.auth().signInWithPopup(provider).then((data) => {
        btnLogin.style.display = 'none';
        btnLogout.style.display = 'block';
        usuario = {
            nombre: data.user.displayName,
            email: data.user.email,
            uid: data.user.uid
        }
        agregarUsuario(usuario, usuario.uid);
    }).catch((error) => {
        console.log(error);
    });
});

function agregarUsuario(usuario, uid) {
    ref.child(uid).update(usuario);
}
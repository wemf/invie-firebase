const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');
var ref = firebase.database().ref("usuario");
var refGuitarras = firebase.database().ref("guitarras");
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
    // Facebook Auth
    // const provider = new firebase.auth.FacebookAuthProvider();
    // provider.addScope('public_profile');
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
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

function leerGuitarras() {
    refGuitarras.child("normal").on("value", function (guitarras) {
        console.log(guitarras.val());
    });
}
leerGuitarras();

function leerGuitarrasVIP() {
    refGuitarras.child("vip").on("value", function (guitarras) {
        console.log(guitarras.val());
    });
}
leerGuitarrasVIP();
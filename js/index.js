const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');

var usuario = {};
firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
        btnLogin.style.display = 'none';
        btnLogout.style.display = 'block';
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
        agregarUsuario(usuario);
    }).catch((error) => {
        console.log(error);
    });
});
function agregarUsuario(usuario) {
    var ref = firebase.database().ref("usuario");
    ref.push(usuario);
}
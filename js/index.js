const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');
const ref = firebase.database().ref("usuario");
const refGuitarras = firebase.database().ref("guitarras");
const refImg = firebase.storage().ref();
var usuario = {};

refImg.child("invie-classic.png").getDownloadURL().then(function (url) {
    console.log(url);
});

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

function leerGuitarrasVip() {
    refGuitarras.child('vip').on('child_added', (datos) => {
        console.log('vip', datos.val())
        const guitar = datos.val()
        const nombreGui = datos.val().nombre
        const contenedorElementos = document.getElementById('guitarrasContent')
        console.log(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.metadata)
        contenedorElementos.insertBefore(
            crearElementoGuitarra(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.img),
            contenedorElementos.firsChild
        )
    })
}

function leerGuitarras() {
    refGuitarras.child('normal').on('child_added', (datos) => {
        console.log('normales', datos.val())
        const guitar = datos.val()
        const nombreGui = datos.val().nombre
        const contenedorElementos = document.getElementById('guitarrasContentVip')
        console.log(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.metadata)
        contenedorElementos.insertBefore(
            crearElementoGuitarra(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.img),
            contenedorElementos.firstChild
        )
    })
}

function crearElementoGuitarra(key, nombre, precio, descripcion, img) {
    const uid = firebase.auth().currentUser.uid

    const html =
        '<article class="guitarra contenedor">' +
        '<img class="derecha" src="" alt="Guitarra Invie Acustica" width="150"/>' +
        '<div class="contenedor-guitarra-a">' +
        '<h3 class="title-b"></h3>' +
        '<ol>' +
        '<li class="precio-b"></li>' +
        '<li class="descripcion-b"></li>' +
        '</ol>' +
        '</div>' +
        '<button type="button" onclick="comprar(' + '`' + key + '`' + ')">Comprar</button>' +
        '</article>'

    // Create the DOM element from the HTML
    var div = document.getElementById('div')
    div.innerHTML = html

    var guitarElement = div.firstChild
    var imgURL = ""
    refImg.child(img).getDownloadURL().then((url) => {
        imgURL = url
    }).then(() => {
        guitarElement.getElementsByClassName('title-b')[0].innerText = nombre
        guitarElement.getElementsByClassName('precio-b')[0].innerText = precio
        guitarElement.getElementsByClassName('descripcion-b')[0].innerText = descripcion
        guitarElement.getElementsByClassName('derecha')[0].src = imgURL
    })
    return guitarElement
}

leerGuitarras()
leerGuitarrasVip()
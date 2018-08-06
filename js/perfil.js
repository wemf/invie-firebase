const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');
const btnPush = document.getElementById('btnPush');
const btnSet = document.getElementById('btnSet');
const btnUpdate = document.getElementById('btnUpdate');
const btnRemove = document.getElementById('btnRemove');
var refTest = firebase.database().ref("test");
var ref = firebase.database().ref("usuario");
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
btnPush.addEventListener("click", function(){
    var obj = {
        curso: "firebase",
        profesor: "angel",
        contenidos: {
            primero: "autenticacion"
        }
    }
    refTest.push(obj).then(function () {
        alert("se subió correctamente la información");     
    }).catch(function(err) {
        alert("hubo un error");
        console.log(err);
    });
});

btnUpdate.addEventListener("click", function() {
    var objeto = {
        curso: "desarrollo web",
        profesor: "leonidas",
        contenidos: {
            primero: "formularios"
        }
    }
    refTest.child("-LJEtEziCosAGR93cjyS").update(objeto).then(function () {
        alert("update correctamente la información");
    }).catch(function (err) {
        alert("hubo un error");
        console.log(err);
    });
});

btnSet.addEventListener("click", function () {
    var object = {
        curso: "responsive",
        profesor: "leonidas",
        contenidos: {
            primero: "media-query"
        }
    }
    refTest.set(object).then(function () {
        alert("set correctamente la información");
    }).catch(function (err) {
        alert("hubo un error");
        console.log(err);
    });
});
btnRemove.addEventListener("click", function () {
    ref.child("wqH0tXa9NAOGAnVKcxUk9w2snRJ3").remove().then(function () {
        alert("remove correctamente la información");
    }).catch(function (err) {
        alert("hubo un error");
        console.log(err);
    });
});
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
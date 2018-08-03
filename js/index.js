const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');
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
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then((data) => {
        btnLogin.style.display = 'none';
        btnLogout.style.display = 'block';
        //console.log(data);
    }).catch((error) => {
        console.log(error);
    });
});
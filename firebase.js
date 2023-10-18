import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getDatabase, set, ref, child, update, remove }
    from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }
    from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQ54dZ26WEKqM89xYGIqfGYIXeegEkIZg",
    authDomain: "first-impression-game.firebaseapp.com",
    databaseURL: "https://first-impression-game-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "first-impression-game",
    storageBucket: "first-impression-game.appspot.com",
    messagingSenderId: "141844359019",
    appId: "1:141844359019:web:a94467ac13ea834d094e2e",
    measurementId: "G-HNKPJQ3DPN"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase();
let id = null;
// auth ---

function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(result => {
        const user = result.user;
        id = user.uid;
        console.log(user);
    }).catch(console.log);
}

function userSignOut() {
    signOut(auth).then(() => {
        id = null;
        console.log('Signed out!')
    });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        id = user.uid;
        setText('loginName', 'Logged in as ' + user.displayName);
    }
    else {
        setText('loginName', 'Not signed in!');
    }
})

// database ---

function insertData() {
    console.log(window.windowSave);
    if (id != null) {
        set(ref(database, 'users/' + id), {
            save: save
        })
        .then(() => {
            console.log('Saved Successfully');
        })
        .catch((error) => {
            console.log('Saving Error ' + error);
        });
    }
}

document.querySelector('#login').addEventListener('click', googleLogin);
document.querySelector('#signOut').addEventListener('click', userSignOut);
document.querySelector('#cloudSave').addEventListener('click', insertData);
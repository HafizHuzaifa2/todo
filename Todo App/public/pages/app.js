import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-analytics.js";
import {
    getDatabase,
    ref,
    push,
    set,
    onValue,
    onChildAdded,
    onChildChanged,
    onChildRemoved,

} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDF3sclJJwmlIh-Hno5GQT72qfSy9cVe7s",
    authDomain: "todoapphuzaifa.firebaseapp.com",
    databaseURL: "https://todoapphuzaifa-default-rtdb.firebaseio.com",
    projectId: "todoapphuzaifa",
    storageBucket: "todoapphuzaifa.appspot.com",
    messagingSenderId: "154497397442",
    appId: "1:154497397442:web:a44bf075159f79da8e415b",
    measurementId: "G-78SLLDKWNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();



var c = document.getElementById("username");
var a = document.getElementById("todoinp");
var user = document.getElementById("user")
var show = document.getElementById("show")

var obj;


addtodo.addEventListener("click", function() {



    obj = {

        list: a.value
    }
    const Ref = ref(db, "list");
    const newPostRef = push(Ref);
    obj.id = newPostRef.key;
    set(newPostRef, obj)
        .then(function() {
            console.log("success");
        })
        .catch(function(err) {
            console.log(err);
        });

    console.log(obj);
});


const dbRef = ref(db, "list");

// ==================== Admin Code ======================
var obj = [];

function renderArray() {
    var show = document.getElementById("show");
    show.innerHTML = "";
    obj.forEach(function(e) {
        // console.log(e);
        show.innerHTML += `
        <li class="d-flex justify-content-between py-2" style="border-bottom: 1px solid gray;">
        <div class="fw-bold">
            ${e.list}

        </div>

        <div>
            <button onclick="edittodo()" class="btn btn-success px-2" id="edit">Edit List</button>
            <button onclick="remove('${e.id}')" class="btn btn-danger px-2" id="remove">Delete</button>
        </div>

    </li> `;
    });
}

// function deleteOrder(id) {
//     console.log(id);
// }
onValue(
    dbRef,
    function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            obj.push(childSnapshot.val());
            renderArray();
            // ...
        });
    }, {
        onlyOnce: false,
    }
);
// window.remove = function(e) {

//     const commentsRef = ref(db, `list/${e}`);
//     console.log(commentsRef)
//     onChildRemoved(commentsRef, (list) => {
//         deleteComment(list, id.key);
//     });
// }





// var todoinp = document.getElementById("todoinp")
// var showlist = document.getElementById("show")

// function addtodo() {
//     var todotext = todoinp.value
//     var todoelm = document.createTextNode(todotext)
//     var todoli = document.createElement("li")
//     todoli.appendChild(todoelm)
//     showlist.appendChild(todoli)

//     var todoDelete = document.createElement("BUTTON")
//     todoDelete.setAttribute('onclick', 'deltodo(this)')
//     var DeL = document.createTextNode("DELETE")
//     todoDelete.appendChild(DeL)
//     todoli.appendChild(todoDelete)

//     var editbutton = document.createElement('button')
//     editbutton.setAttribute('onclick', 'edittodo(this)')
//     var Edit = document.createTextNode("EDIT")
//     editbutton.appendChild(Edit)
//     todoli.appendChild(editbutton)

// }
// function deltodo(element) {
//     element.parentNode.remove()
// }
// function edittodo(element) {
//     element.parentNode.firstChild.nodeValue = prompt("Edit" + element.parentNode.firstChild.nodeValue)
// }
// function DeleteAll() {
//     showlist.innerHTML = ""

// }
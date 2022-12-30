var firebaseConfig = {
      apiKey: "AIzaSyC-U78ql3gHjkb5ZiVZ_a2F0u2vNRT1HGE",
      authDomain: "kwitter-daf0f.firebaseapp.com",
      databaseURL: "https://kwitter-daf0f-default-rtdb.firebaseio.com",
      projectId: "kwitter-daf0f",
      storageBucket: "kwitter-daf0f.appspot.com",
      messagingSenderId: "966460107047",
      appId: "1:966460107047:web:bdc6c437b1ac64df0e6102",
      measurementId: "G-GSY4NMF8FL"
    };
    
    // Initialize Firebase
firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERE


username = localStorage.getItem("user");
document.getElementById("h3user_name").innerHTML = "Welcome, " + username + "!";

function addRoom(){
      room_name = document.getElementById("room_input").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "Added Room"
      });

      localStorage.setItem("room", room_name);

      window.location = "kwitter_page.html";
}

function getData() {firebase.database().ref("/" + room_name).on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;

      //Start code
      console.log(Room_names);
      row = "<div id=" + Room_names + " onclick='redirectToRoomName(this.id)'>#"+ Room_names + "</div>"
      document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();

function redirectToRoomName(name){
      console.log("You opened this room: " + name);
      localStorage.setItem("room", name);
      window.location = "kwitter_page.html";
}
function logOut(){
      localStorage.removeItem("user");
      localStorage.removeItem("room");
      window.location = "index.html";
}
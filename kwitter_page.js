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
//YOUR FIREBASE LINKS

username = localStorage.getItem("user");
room_name = localStorage.getItem("room");

function send(){
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: username,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);

name = message_data['name'];
message = message_data['message'];
like = message_data['like'];

user = "<h4 id='user'>" + name + "<sup><img class='user_tick' src='tick.png'><sup></h4>";
msg_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button = "<button class='btn btn-warning' id=" + firebase_message_id + "value=" + like + "onclick='updateLike(this.id)'>";
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> "+ like +"</span></button><hr>";

row = user + msg_tag + like_button + span_with_tag;
document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function updateLike(message_id) {
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}

function logOut(){
      localStorage.removeItem("user");
      localStorage.removeItem("room");
      window.location = "index.html";
}
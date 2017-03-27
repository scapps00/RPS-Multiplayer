  var config = {
    apiKey: "AIzaSyBl08B4TCLkqZuE_tzpEs-qjs7Vn69U6-k",
    authDomain: "rpsgame-5f63e.firebaseapp.com",
    databaseURL: "https://rpsgame-5f63e.firebaseio.com",
    storageBucket: "rpsgame-5f63e.appspot.com",
    messagingSenderId: "603451137166"
  };
  firebase.initializeApp(config);

 var database = firebase.database();

 database.ref().on("value", function(snapshot) {
 	if (snapshot.val().numPlayers == "0") {
 		$("#submit").click(function() {
 			database.ref().set({
       			name1: $("#name").val(),
       			numPlayers: "1"
     		});
     	location.replace("game.html");
 		});
 	}
 	if (snapshot.val().numPlayers == "1") {
 		$("#submit").click(function() {
 			database.ref().set({
       			name2: $("#name").val(),
       			numPlayers: "2"
     		});
     		location.replace("game.html");
 		});
 	}
 })
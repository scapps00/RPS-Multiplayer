$(document).ready(function() {
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
	if (snapshot.val().playerInfo.numPlayers == "2") {
		location.replace("game.html");
	}
});

});
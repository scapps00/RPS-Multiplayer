//initializes Firebase
$(document).ready(function() {
var config = {
    apiKey: process.env.rpskey,
    authDomain: "rpsgame-5f63e.firebaseapp.com",
    databaseURL: "https://rpsgame-5f63e.firebaseio.com",
    storageBucket: "rpsgame-5f63e.appspot.com",
    messagingSenderId: "603451137166"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//when there are two players registered in Firebase, game.html opens
database.ref().on("value", function(snapshot) {
	if (snapshot.val().playerInfo.numPlayers == "2") {
		location.replace("game.html");
	}
	
	//when window is closed, player is deleted from Firebase
	window.onunload = function() {
	database.ref("playerInfo").set({
		name1: snapshot.val().playerInfo.name1,
		name2: snapshot.val().playerInfo.name2,
		score1: 0,
		score2: 0,
		numPlayers: "0"
	});
}
});

});
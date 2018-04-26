//initializes Firebase
$(document).ready(function() {
	var rpslskey = "";

	//gets Firebase database key
	$.ajax({
		method: "GET",
		url: "../rpslskey"
	}).done(function(result) {
		rpslskey = result;
	});

var config = {
	apiKey: rpslskey,
	authDomain: "rpsgame-5f63e.firebaseapp.com",
	databaseURL: "https://rpsgame-5f63e.firebaseio.com",
	storageBucket: "rpsgame-5f63e.appspot.com",
	messagingSenderId: "603451137166"
	};

	firebase.initializeApp(config);
	
	var database = firebase.database();

 //if there is not another player registered, holdingroom.html room opens
 //if there is, game.html opens
 //if there are already two people playing, error message displays
 database.ref().on("value", function(snapshot) {
	if (snapshot.val().playerInfo.numPlayers == "0") {
		sessionStorage.setItem("playerNum", "1");
		$("#submit").on("click touchstart", function() {
			database.ref("playerInfo").set({
			   name2: snapshot.val().playerInfo.name2,
			   score1: snapshot.val().playerInfo.score1,
			   score2: snapshot.val().playerInfo.score2,
				name1: $("#name").val(),
				numPlayers: "1"
			});
		location.replace("holdingroom.html");
		});
	}
	else if (snapshot.val().playerInfo.numPlayers == "1") {
		$("#submit").on("click touchstart", function() {
			sessionStorage.setItem("playerNum", "2");
			database.ref("playerInfo").set({
				name1: snapshot.val().playerInfo.name1,
			   score1: snapshot.val().playerInfo.score1,
			   score2: snapshot.val().playerInfo.score2,
				  name2: $("#name").val(),
				  numPlayers: "2"
			});
			location.replace("game.html");
		});
	} else if (snapshot.val().playerInfo.numPlayers == "2") {
		$("#submit").on("click touchstart", function() {
			alert("Two people are already playing. Try again later.");
		});
	}
});
});
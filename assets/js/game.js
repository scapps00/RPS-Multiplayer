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
	$(".yrName").text(snapshot.val().playerInfo.name1);
	$(".opName").text(snapshot.val().playerInfo.name2);
	action1();
	// if (snapshot.val().playerInfonum.Players == "1") {

	// }

});

function action1() {
	$("#rock").click(function() {rock1()});
	$("#paper").click(function() {paper1()});
	$("#scissors").click(function() {scissors1()});
	$("#lizard").click(function() {lizard1()});
	$("#spock").click(function() {spock1()});
}

function rock1() {
	database.ref("move1").set({
	    move1: "rock"
	});
	$("#rock").css("background-color", "#FFA500");
}

function paper1() {
	database.ref("move1").set({
	    move1: "paper"
	});
	$("#paper").css("background-color", "#FFA500");
}

function scissors1() {
	database.ref("move1").set({
	    move1: "scissors"
	});
	$("#scissors").css("background-color", "#FFA500");
}

function lizard1() {
	database.ref("move1").set({
	    move1: "lizard"
	});
	$("#lizard").css("background-color", "#FFA500");
}

function spock1() {
	database.ref("move1").set({
	    move1: "spock"
	});
	$("#spock").css("background-color", "#FFA500");
}

window.onunload = function() {
	database.ref().on("value", function(snapshot) {
		if (snapshot.val().playerInfo.numPlayers == "2") {
			database.ref("playerInfo").set({
				name1: snapshot.val().playerInfo.name1,
				name2: snapshot.val().playerInfo.name2,
				score1: snapshot.val().playerInfo.score1,
				score2: snapshot.val().playerInfo.score2,
	       		numPlayers: "1"
	    	});
		} else if (snapshot.val().playerInfo.numPlayers == "1") {
			database.ref("playerInfo").set({
				name1: snapshot.val().playerInfo.name1,
				name2: snapshot.val().playerInfo.name2,
				score1: snapshot.val().playerInfo.score1,
				score2: snapshot.val().playerInfo.score2,
	       		numPlayers: "0"
	    	});
		}
	
	});
};
});
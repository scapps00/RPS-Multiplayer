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
	$(".yrName").text(snapshot.val().name1);
	$(".opName").text(snapshot.val().name2);
	action1();
	if (snapshot.val().numPlayers == "1") {

	}

})

function action1() {
	$("#rock").click(rock1());
	$("#paper").click(paper1());
	$("#scissors").click(scissors1());
	$("#lizard").click(lizard1());
	$("#spock").click(spock1());
}

function rock1() {
	database.ref().set({
	    move1: "rock"
	});
	$("#rock").css("background-color", "#FFA500");
}

function paper1() {
	database.ref().set({
	    move1: "paper"
	});
	$("#paper").css("background-color", "#FFA500");
}

function scissors1() {
	database.ref().set({
	    move1: "scissors"
	});
	$("#scissors").css("background-color", "#FFA500");
}

function lizard1() {
	database.ref().set({
	    move1: "lizard"
	});
	$("#lizard").css("background-color", "#FFA500");
}

function spock1() {
	database.ref().set({
	    move1: "spock"
	});
	$("#spock").css("background-color", "#FFA500");
}

window.onbeforeunload = function() {
	database.ref().on("value", function(snapshot) {
		if (snapshot.val().numPlayers == "2") {
			database.ref().set({
	       		numPlayers: "1"
	    	});
		} else if (snapshot.val().numPlayers == "1") {
			database.ref().set({
	       		numPlayers: "0"
	    	});
		}
	
	});
}
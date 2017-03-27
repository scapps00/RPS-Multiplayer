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
})

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
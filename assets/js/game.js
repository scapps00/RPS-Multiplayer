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

if (sessionStorage.getItem("playerNum") == "1") {


		$(".yrName").text(snapshot.val().playerInfo.name1);
		$(".opName").text(snapshot.val().playerInfo.name2);
		$("#yrWins").text(snapshot.val().playerInfo.score1);
		$("#opWins").text(snapshot.val().playerInfo.score2);
		var move1 = snapshot.val().move1.move1;
		var move2 = snapshot.val().move2.move2;
		$("#yrChoice").text(move1);
		$("#opChoice").text(move2);
		//$("#" + $("#opChoice").text()).css("background-color", "red");


	function compare1() {
			move1 = $("#yrChoice").text();
			move2 = $("#opChoice").text();
				if (move1 == "rock") {
					pickRock1(move2);
				}
				else if (move1 == "paper") {
					pickPaper1(move2);
				}
				else if (move1 == "scissors") {
					pickScissors1(move2);
				}
				else if (move1 == "lizard") {
					pickLizard1(move2);
				}
				else if (move1 == "spock") {
					pickSpock1(move2);
				}
				if ($("#message") != "") {
					setTimeout(nextRound1, 3000);
				}
			
	}

	function action1() {
		$("#rock").on("click touchstart", function() {rock1()});
		$("#paper").on("click touchstart", function() {paper1()});
		$("#scissors").on("click touchstart", function() {scissors1()});
		$("#lizard").on("click touchstart", function() {lizard1()});
		$("#spock").on("click touchstart", function() {spock1()});
	}

	function rock1() {
		database.ref("move1").set({
		    move1: "rock"
		});
		//$("#rock").css("background-color", "#FFA500");
		$("#rock").unbind();
		$("#paper").unbind();
		$("#scissors").unbind();
		$("#lizard").unbind();
		$("#spock").unbind();
		compare1();
	}

	function paper1() {
		database.ref("move1").set({
		    move1: "paper"
		});
		//$("#paper").css("background-color", "#FFA500");
		$("#rock").unbind();
		$("#paper").unbind();
		$("#scissors").unbind();
		$("#lizard").unbind();
		$("#spock").unbind();
		compare1();
	}

	function scissors1() {
		database.ref("move1").set({
		    move1: "scissors"
		});
		//$("#scissors").css("background-color", "#FFA500");
		$("#rock").unbind();
		$("#paper").unbind();
		$("#scissors").unbind();
		$("#lizard").unbind();
		$("#spock").unbind();
		compare1();
	}

	function lizard1() {
		database.ref("move1").set({
		    move1: "lizard"
		});
		//$("#lizard").css("background-color", "#FFA500");
		$("#rock").unbind();
		$("#paper").unbind();
		$("#scissors").unbind();
		$("#lizard").unbind();
		$("#spock").unbind();
		compare1();
	}

	function spock1() {
		database.ref("move1").set({
		    move1: "spock"
		});
		//$("#spock").css("background-color", "#FFA500");
		$("#rock").unbind();
		$("#paper").unbind();
		$("#scissors").unbind();
		$("#lizard").unbind();
		$("#spock").unbind();
		compare1();
	}




	action1();

	function nextRound1() {
			database.ref("move1").set({
				move1: ""
	    	});
	    	database.ref("move2").set({
				move2: ""
	    	});
			//$("#rock #paper #scissors #lizard #spock").css("background-color", "transparent");
			$("#message, #yrChoice, #opChoice").text("");

	}

	function win1() {
		database.ref("playerInfo").set({
			name1: snapshot.val().playerInfo.name1,
			name2: snapshot.val().playerInfo.name2,
			score1: snapshot.val().playerInfo.score1 + 1,
			score2: snapshot.val().playerInfo.score2,
		    numPlayers: snapshot.val().playerInfo.numPlayers
	    });
	    $("#message").text("You win!");
	}

	function lose1() {
		database.ref("playerInfo").set({
			name1: snapshot.val().playerInfo.name1,
			name2: snapshot.val().playerInfo.name2,
			score1: snapshot.val().playerInfo.score1,
			score2: snapshot.val().playerInfo.score2 + 1,
		    numPlayers: snapshot.val().playerInfo.numPlayers
	    });
	    $("#message").text("You lose!");
	    	}

	function pickRock1(move2) {
		if (move2 == "rock") {
			$("#message").text("You tie!");
		} else if (move2 == "paper") {
			lose1();
		} else if (move2 == "scissors") {
			win1();
		} else if (move2 == "lizard") {
			win1();
		} else if (move2 == "spock") {
			lose1();
		}
	}

	function pickPaper1(move2) {
		if (move2 == "rock") {
			win1();
		} else if (move2 == "paper") {
			$("#message").text("You lose!");
		} else if (move2 == "scissors") {
			lose1();
		} else if (move2 == "lizard") {
			lose1();
		} else if (move2 == "spock") {
			win1();
		}
	}

	function pickScissors1(move2) {
		if (move2 == "rock") {
			lose1();
		} else if (move2 == "paper") {
			win1();
		} else if (move2 == "scissors") {
			$("#message").text("You tie!");
		} else if (move2 == "lizard") {
			win1();
		} else if (move2 == "spock") {
			lose1();
		}
	}

	function pickLizard1(move2) {
		if (move2 == "rock") {
			lose1();
		} else if (move2 == "paper") {
			win1();
		} else if (move2 == "scissors") {
			lose1();
		} else if (move2 == "lizard") {
			$("#message").text("You tie!");
		} else if (move2 == "spock") {
			lose1();
		}
	}

	function pickSpock1(move2) {
		if (move2 == "rock") {
			win1();
		} else if (move2 == "paper") {
			lose1();
		} else if (move2 == "scissors") {
			win1();
		} else if (move2 == "lizard") {
			lose1();
		} else if (move2 == "spock") {
			$("#message").text("You tie!");
		}
	}
}

if (sessionStorage.getItem("playerNum") == "2") {

		$(".yrName").text(snapshot.val().playerInfo.name2);
		$(".opName").text(snapshot.val().playerInfo.name1);
		$("#yrWins").text(snapshot.val().playerInfo.score2);
		$("#opWins").text(snapshot.val().playerInfo.score1);
		var move1 = snapshot.val().move1.move1;
		var move2 = snapshot.val().move2.move2;
		$("#yrChoice").text(move2);
		$("#opChoice").text(move1);
		//$("#" + $("#opChoice").text()).css("background-color", "red");


	function compare2() {

			move1 = $("#opChoice").text();
			move2 = $("#yrChoice").text();
				if (move2 == "rock") {
					pickRock2(move1);
				}
				else if (move2 == "paper") {
					pickPaper2(move1);
				}
				else if (move2 == "scissors") {
					pickScissors2(move1);
				}
				else if (move2 == "lizard") {
					pickLizard2(move1);
				}
				else if (move2 == "spock") {
					pickSpock2(move1);
				}
				if ($("#message").text() != "") {
				setTimeout(nextRound2, 3000);
			}

	}

	function action2() {
		$("#rock").on("click touchstart", function() {rock2()});
		$("#paper").on("click touchstart", function() {paper2()});
		$("#scissors").on("click touchstart", function() {scissors2()});
		$("#lizard").on("click touchstart", function() {lizard2()});
		$("#spock").on("click touchstart", function() {spock2()});
	}

	function rock2() {
		database.ref("move2").set({
		    move2: "rock"
		});
		//$("#rock").css("background-color", "#FFA500");
		$("#rock").unbind();
		$("#paper").unbind();
		$("#scissors").unbind();
		$("#lizard").unbind();
		$("#spock").unbind();
		compare2();
	}

	function paper2() {
		database.ref("move2").set({
		    move2: "paper"
		});
		//$("#paper").css("background-color", "#FFA500");
		$("#rock").unbind();
		$("#paper").unbind();
		$("#scissors").unbind();
		$("#lizard").unbind();
		$("#spock").unbind();
		compare2();
	}

	function scissors2() {
		database.ref("move2").set({
		    move2: "scissors"
		});
		//$("#scissors").css("background-color", "#FFA500");
		$("#rock").unbind();
		$("#paper").unbind();
		$("#scissors").unbind();
		$("#lizard").unbind();
		$("#spock").unbind();
		compare2();
	}

	function lizard2() {
		database.ref("move2").set({
		    move2: "lizard"
		});
		//$("#lizard").css("background-color", "#FFA500");
		$("#rock").unbind();
		$("#paper").unbind();
		$("#scissors").unbind();
		$("#lizard").unbind();
		$("#spock").unbind();
		compare2();
	}

	function spock2() {
		database.ref("move2").set({
		    move2: "spock"
		});
		//$("#spock").css("background-color", "#FFA500");
		$("#rock").unbind();
		$("#paper").unbind();
		$("#scissors").unbind();
		$("#lizard").unbind();
		$("#spock").unbind();
		compare2();
	}

	action2();

	function nextRound2() {
		database.ref("move1").set({
				move1: ""
	    	});
	    	database.ref("move2").set({
				move2: ""
	    	});
		//$("#rock #paper #scissors #lizard #spock").css("background-color", "transparent");
		$("#message, #yrChoice, #opChoice").text("");
	}

	function win2() {
		$("#message").text("You win!");
	}

	function lose2() {
		$("#message").text("You lose!");
	}

	function pickRock2(move1) {
		if (move1 == "rock") {
			$("#message").text("You tie!");
		} else if (move1 == "paper") {
			lose2();
		} else if (move1 == "scissors") {
			win2();
		} else if (move1 == "lizard") {
			win2();
		} else if (move1 == "spock") {
			lose2();
		}
	}

	function pickPaper2(move1) {
		if (move1 == "rock") {
			win2();
		} else if (move1 == "paper") {
			$("#message").text("You lose!");
		} else if (move1 == "scissors") {
			lose2();
		} else if (move1 == "lizard") {
			lose2();
		} else if (move1 == "spock") {
			win2();
		}
	}

	function pickScissors2(move1) {
		if (move1 == "rock") {
			lose2();
		} else if (move1 == "paper") {
			win2();
		} else if (move1 == "scissors") {
			$("#message").text("You tie!");
		} else if (move1 == "lizard") {
			win2();
		} else if (move1 == "spock") {
			lose2();
		}
	}

	function pickLizard2(move1) {
		if (move1 == "rock") {
			lose2();
		} else if (move1 == "paper") {
			win2();
		} else if (move1 == "scissors") {
			lose2();
		} else if (move1 == "lizard") {
			$("#message").text("You tie!");
		} else if (move1 == "spock") {
			lose2();
		}
	}

	function pickSpock2(move1) {
		if (move1 == "rock") {
			win2();
		} else if (move1 == "paper") {
			lose2();
		} else if (move1 == "scissors") {
			win2();
		} else if (move1 == "lizard") {
			lose2();
		} else if (move1 == "spock") {
			$("#message").text("You tie!");
		}
	}

}


	window.onunload = function() {
		if (snapshot.val().playerInfo.numPlayers == "2") {
			database.ref("playerInfo").set({
				name1: snapshot.val().playerInfo.name1,
				name2: snapshot.val().playerInfo.name2,
				score1: 0,
				score2: 0,
	       		numPlayers: "1"
	    	});
			database.ref("move1").set({
				move1: ""
	    	});
	    	database.ref("move2").set({
				move2: ""
	    	});
		} else if (snapshot.val().playerInfo.numPlayers == "1") {
			database.ref("playerInfo").set({
				name1: snapshot.val().playerInfo.name1,
				name2: snapshot.val().playerInfo.name2,
				score1: 0,
				score2: 0,
	       		numPlayers: "0"
	    	});
			database.ref("move1").set({
				move1: ""
	    	});
	    	database.ref("move2").set({
				move2: ""
	    	});
		}
	
	};
});
});

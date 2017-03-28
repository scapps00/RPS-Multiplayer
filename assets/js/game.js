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

var move1 = "";
var move2 = "";



database.ref().on("value", function(snapshot) {

if (sessionStorage.getItem("playerNum") == "1") {


		$(".yrName").text(snapshot.val().playerInfo.name1);
		$(".opName").text(snapshot.val().playerInfo.name2);
		$("#yrWins").text(snapshot.val().playerInfo.score1);
		$("#opWins").text(snapshot.val().playerInfo.score2);
		$("#message").text(snapshot.val().status1.message1);
		$("#yrChoice").text(snapshot.val().move1.visible1);
		$("#opChoice").text(snapshot.val().move2.visible2);
		//$("#" + $("#opChoice").text()).css("background-color", "red");


	// database.ref("move1").on("child_changed", function(snapshot) {
	// 	if (snapshot.val().move1 !== ("rock" || "paper" || "scissors" || "lizard" || "spock")) {
	// 		action1();
	// 	}
	// });

	$("#clickToStart").click(function() {action1()});

	function action1() {
			$("#rock").on("click touchstart", function() {rock1()});
			$("#paper").on("click touchstart", function() {paper1()});
			$("#scissors").on("click touchstart", function() {scissors1()});
			$("#lizard").on("click touchstart", function() {lizard1()});
			$("#spock").on("click touchstart", function() {spock1()});
			$("#clickToStart").text("");

	}

function nextRound1() {
			database.ref("move1").set({
				move1: "",
				visible1: ""
	    	});
	    	database.ref("move2").set({
				move2: "",
				visible2: ""
	    	});
	    	database.ref("status1").set({
	    		message1: ""
	    	});
	    	database.ref("status2").set({
	    		message2: ""
	    	});
	    	$("#hidden1").text("");
	    	$("#hidden2").text("");
	    	action1();
			//$("#rock #paper #scissors #lizard #spock").css("background-color", "transparent");
			//$("#message, #yrChoice, #opChoice").text("");

	}

	function win1() {
		database.ref("playerInfo").on("value", function(snapshot) {
			$("#win1").text(snapshot.val().score1);
			$("#win2").text(snapshot.val().score2);
		});	
		database.ref("playerInfo").set({
			name1: snapshot.val().playerInfo.name1,
			name2: snapshot.val().playerInfo.name2,
			score1: parseInt($("#win1").text()) + 1,
			score2: $("#win2").text(),
		    numPlayers: snapshot.val().playerInfo.numPlayers
	    });
	    database.ref("status1").set({
	    	message1: "You win!"
	    });
	    database.ref("status2").set({
				message2: "You lose!"
			});
	    database.ref("move1").set({
	    	move1: move1,
	    	visible1: move1
	    });
	    database.ref("move2").set({
	    	move2: move2,
	    	visible2: move2
	    });
	    setTimeout(nextRound1, 4000);
	}

	function lose1() {
		database.ref("playerInfo").on("value", function(snapshot) {
			$("#win1").text(snapshot.val().score1);
			$("#win2").text(snapshot.val().score2);
		});	
		database.ref("playerInfo").set({
			name1: snapshot.val().playerInfo.name1,
			name2: snapshot.val().playerInfo.name2,
			score1: $("#win1").text(),
			score2: parseInt($("#win2").text()) + 1,
		    numPlayers: snapshot.val().playerInfo.numPlayers
	    });
	    database.ref("status1").set({
	    	message1: "You lose!"
	    });
	    database.ref("status2").set({
				message2: "You win!"
			});
	    database.ref("move1").set({
	    	move1: move1,
	    	visible1: move1
	    });
	    database.ref("move2").set({
	    	move2: move2,
	    	visible2: move2
	    });
	    setTimeout(nextRound1, 4000);
	    	}

	function pickRock1(move2) {
		if (move2 == "rock") {
			database.ref("status1").set({
				message1: "You tied!"
			});
			database.ref("status2").set({
				message2: "You tied!"
			});
				   	database.ref("move1").set({
	   		move1: move1,
	    	visible1: move1
	    });
	    database.ref("move2").set({
	    	move2: move2,
	    	visible2: move2
	    });
			setTimeout(nextRound1, 4000);
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
		if (move2 ==="rock") {
			win1();
		} else if (move2 == "paper") {
			database.ref("status1").set({
				message1: "You tied!"
			});
			database.ref("status2").set({
				message2: "You tied!"
			});
				   	database.ref("move1").set({
	   		move1: move1,
	    	visible1: move1
	    });
	    database.ref("move2").set({
	    	move2: move2,
	    	visible2: move2
	    });
			setTimeout(nextRound1, 4000);
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
			database.ref("status1").set({
				message1: "You tied!"
			});
			database.ref("status2").set({
				message2: "You tied!"
			});
				   	database.ref("move1").set({
	   		move1: move1,
	    	visible1: move1
	    });
	    database.ref("move2").set({
	    	move2: move2,
	    	visible2: move2
	    });
			setTimeout(nextRound1, 4000);
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
			database.ref("status1").set({
				message1: "You tied!"
			});
			database.ref("status2").set({
				message2: "You tied!"
			});
				   	database.ref("move1").set({
	   		move1: move1,
	    	visible1: move1
	    });
	    database.ref("move2").set({
	    	move2: move2,
	    	visible2: move2
	    });
			setTimeout(nextRound1, 4000);
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
			database.ref("status1").set({
				message1: "You tied!"
			});
			database.ref("status2").set({
				message2: "You tied!"
			});
				   	database.ref("move1").set({
	   		move1: move1,
	    	visible1: move1
	    });
	    database.ref("move2").set({
	    	move2: move2,
	    	visible2: move2
	    });
			setTimeout(nextRound1, 4000);
		}
	}

	function compare1() {
			database.ref("move1").on("value", function(snapshot) {
				$("#hidden1").text(snapshot.val().move1);
			});
			move1 = $("#hidden1").text();
			database.ref("move2").on("value", function(snapshot) {
				if (snapshot.val().move2 !== "") {
					$("#hidden2").text(snapshot.val().move2);
				}
			});
				move2 = $("#hidden2").text();
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
			
			
	}



	function rock1() {
		database.ref("move1").set({
		    move1: "rock",
		    visible1: ""
		});
		//$("#rock").css("background-color", "#FFA500");
		// $("#rock").unbind();
		// $("#paper").unbind();
		// $("#scissors").unbind();
		// $("#lizard").unbind();
		// $("#spock").unbind();
		compare1();
	}

	function paper1() {
		database.ref("move1").set({
		    move1: "paper",
		    visible1: ""
		});
		// //$("#paper").css("background-color", "#FFA500");
		// $("#rock").unbind();
		// $("#paper").unbind();
		// $("#scissors").unbind();
		// $("#lizard").unbind();
		// $("#spock").unbind();
		compare1();
	}

	function scissors1() {
		database.ref("move1").set({
		    move1: "scissors",
		    visible1: ""
		});
		//$("#scissors").css("background-color", "#FFA500");
		// $("#rock").unbind();
		// $("#paper").unbind();
		// $("#scissors").unbind();
		// $("#lizard").unbind();
		// $("#spock").unbind();
		compare1();
	}

	function lizard1() {
		database.ref("move1").set({
		    move1: "lizard",
		    visible1: ""
		});
		//$("#lizard").css("background-color", "#FFA500");
		// $("#rock").unbind();
		// $("#paper").unbind();
		// $("#scissors").unbind();
		// $("#lizard").unbind();
		// $("#spock").unbind();
		compare1();
	}

	function spock1() {
		database.ref("move1").set({
		    move1: "spock",
		    visible1: ""
		});
		//$("#spock").css("background-color", "#FFA500");
		// $("#rock").unbind();
		// $("#paper").unbind();
		// $("#scissors").unbind();
		// $("#lizard").unbind();
		// $("#spock").unbind();
		compare1();
	}






	



}

//$(window).load(function() {action1()});


if (sessionStorage.getItem("playerNum") == "2") {

		$(".yrName").text(snapshot.val().playerInfo.name2);
		$(".opName").text(snapshot.val().playerInfo.name1);
		$("#yrWins").text(snapshot.val().playerInfo.score2);
		$("#opWins").text(snapshot.val().playerInfo.score1);
		$("#message").text(snapshot.val().status2.message2);
		$("#yrChoice").text(snapshot.val().move2.visible2);
		$("#opChoice").text(snapshot.val().move1.visible1);
		//$("#" + $("#opChoice").text()).css("background-color", "red");


	function compare2() {
			database.ref("move2").on("value", function(snapshot) {
				$("#hidden2").text(snapshot.val().move2);
			});
			move2 = $("#hidden2").text();
			database.ref("move1").on("value", function(snapshot) {
				if (snapshot.val().move1 !== "") {
					$("#hidden1").text(snapshot.val().move1);
				}
			});
				move1 = $("#hidden1").text();
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

	}



	// database.ref("move2").on("child_changed", function(snapshot) {
	// 	if (snapshot.val().move2 !== ("rock" || "paper" || "scissors" || "lizard" || "spock")) {
	// 		action2();
	// 	}
	// });

	$("#clickToStart").click(function() {action2()});

	function action2() {
			$("#rock").on("click touchstart", function() {rock2()});
			$("#paper").on("click touchstart", function() {paper2()});
			$("#scissors").on("click touchstart", function() {scissors2()});
			$("#lizard").on("click touchstart", function() {lizard2()});
			$("#spock").on("click touchstart", function() {spock2()});
			$("#clickToStart").text("");
	}

	function rock2() {
		database.ref("move2").set({
		    move2: "rock",
		    visible2: ""
		});
		// //$("#rock").css("background-color", "#FFA500");
		// $("#rock").unbind();
		// $("#paper").unbind();
		// $("#scissors").unbind();
		// $("#lizard").unbind();
		// $("#spock").unbind();
		compare2();
	}

	function paper2() {
		database.ref("move2").set({
		    move2: "paper",
		    visible2: ""
		});
		//$("#paper").css("background-color", "#FFA500");
		// $("#rock").unbind();
		// $("#paper").unbind();
		// $("#scissors").unbind();
		// $("#lizard").unbind();
		// $("#spock").unbind();
		compare2();
	}

	function scissors2() {
		database.ref("move2").set({
		    move2: "scissors",
		    visible2: ""
		});
		// //$("#scissors").css("background-color", "#FFA500");
		// $("#rock").unbind();
		// $("#paper").unbind();
		// $("#scissors").unbind();
		// $("#lizard").unbind();
		// $("#spock").unbind();
		compare2();
	}

	function lizard2() {
		database.ref("move2").set({
		    move2: "lizard",
		    visible2: ""
		});
		//$("#lizard").css("background-color", "#FFA500");
		// $("#rock").unbind();
		// $("#paper").unbind();
		// $("#scissors").unbind();
		// $("#lizard").unbind();
		// $("#spock").unbind();
		compare2();
	}

	function spock2() {
		database.ref("move2").set({
		    move2: "spock",
		    visible2: ""
		});
		//$("#spock").css("background-color", "#FFA500");
		// $("#rock").unbind();
		// $("#paper").unbind();
		// $("#scissors").unbind();
		// $("#lizard").unbind();
		// $("#spock").unbind();
		compare2();
	}



	function nextRound2() {
			database.ref("move1").set({
				move1: "",
				visible1: ""
	    	});
	    	database.ref("move2").set({
				move2: "",
				visible2: ""
	    	});
	    	database.ref("status1").set({
	    		message1: ""
	    	});
	    	database.ref("status2").set({
	    		message2: ""
	    	});
	    	$("#hidden1").text("");
	    	$("#hidden2").text("");
	    	action2();
	}

	function win2() {
	    database.ref("status2").set({
	    	message2: "You win!"
	    });
	    database.ref("status1").set({
	    	message1: "You lose!"
	    });
		database.ref("playerInfo").on("value", function(snapshot) {
			$("#win1").text(snapshot.val().score1);
			$("#win2").text(snapshot.val().score2);
		});	
		database.ref("playerInfo").set({
			name1: snapshot.val().playerInfo.name1,
			name2: snapshot.val().playerInfo.name2,
			score1: $("#win1").text(),
			score2: parseInt($("#win2").text()) + 1,
		    numPlayers: snapshot.val().playerInfo.numPlayers
	    });
	    database.ref("move1").set({
	    	move1: move1,
	    	visible1: move1
	    });
	    database.ref("move2").set({
	    	move2: move2,
	    	visible2: move2
	    });
	    setTimeout(nextRound2, 4000);
	}

	function lose2() {
	    database.ref("status2").set({
	    	message2: "You lose!"
	    });
	    database.ref("status1").set({
	    	message1: "You win!"
	    });
		database.ref("playerInfo").on("value", function(snapshot) {
			$("#win1").text(snapshot.val().score1);
			$("#win2").text(snapshot.val().score2);
		});	
		database.ref("playerInfo").set({
			name1: snapshot.val().playerInfo.name1,
			name2: snapshot.val().playerInfo.name2,
			score1: parseInt($("#win1").text()) + 1,
			score2: $("#win2").text(),
		    numPlayers: snapshot.val().playerInfo.numPlayers
	    });
	   	database.ref("move1").set({
	   		move1: move1,
	    	visible1: move1
	    });
	    database.ref("move2").set({
	    	move2: move2,
	    	visible2: move2
	    });
	    setTimeout(nextRound2, 4000);
	}

	function pickRock2(move1) {
		if (move1 == "rock") {
			database.ref("status2").set({
				message2: "You tied!"
			});
		database.ref("move1").set({
	   		move1: move1,
	    	visible1: move1
	    });
	    database.ref("move2").set({
	    	move2: move2,
	    	visible2: move2
	    });
			setTimeout(nextRound2, 4000);
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
			database.ref("status2").set({
				message2: "You tied!"
			});
			database.ref("status1").set({
		    	message1: "You tied!"
		    });
		    	   	database.ref("move1").set({
	   		move1: move1,
	    	visible1: move1
	    });
	    database.ref("move2").set({
	    	move2: move2,
	    	visible2: move2
	    });
		    setTimeout(nextRound2, 4000);
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
			database.ref("status2").set({
				message2: "You tied!"
			});
			database.ref("status1").set({
		    	message1: "You tied!"
		    });
		    	   	database.ref("move1").set({
	   		move1: move1,
	    	visible1: move1
	    });
	    database.ref("move2").set({
	    	move2: move2,
	    	visible2: move2
	    });
		    setTimeout(nextRound2, 4000);
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
			database.ref("status2").set({
				message2: "You tied!"
			});
			database.ref("status1").set({
		    	message1: "You tied!"
		    });
		    	   	database.ref("move1").set({
	   		move1: move1,
	    	visible1: move1
	    });
	    database.ref("move2").set({
	    	move2: move2,
	    	visible2: move2
	    });
		    setTimeout(nextRound2, 4000);
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
			database.ref("status2").set({
				message2: "You tied!"
			});
			database.ref("status1").set({
		    	message1: "You tied!"
		    });
		    	   	database.ref("move1").set({
	   		move1: move1,
	    	visible1: move1
	    });
	    database.ref("move2").set({
	    	move2: move2,
	    	visible2: move2
	    });
		    setTimeout(nextRound2, 4000);
		}
	}


	//$(window).load(function() {action2()});

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
				move1: "",
				visible1: ""
	    	});
	    	database.ref("move2").set({
				move2: "",
				visible2: ""
	    	});
	    	database.ref("chat").set({
	    	});
	    	database.ref("status1").set({
	    		message1: ""
	    	});
	    	database.ref("status2").set({
	    		message2: ""
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
				move1: "",
				visible1: ""
	    	});
	    	database.ref("move2").set({
				move2: "",
				visible2: ""
	    	});
	    	database.ref("chat").set({
	    	});
	    	database.ref("status1").set({
	    		message1: ""
	    	});
	    	database.ref("status2").set({
	    		message2: ""
	    	});
		}
	
	};



});




function chat() {
	database.ref("chat").push({
		content: $("#yrName").text() + ": " + $("#chatInput").val()
	});
	$("#chatInput").val("");
}

database.ref("chat").on("child_added", function(snapshot) {
	$("#chatContent").append("<br>" + snapshot.val().content);
});

$("#chatSubmit").on("click touchstart", function() {chat()});

});

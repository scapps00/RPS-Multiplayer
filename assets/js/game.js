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

//rules alert button
$("#rules").click(function() {
	alert("SCISSORS CUT PAPER\nPAPER COVERS ROCK\nROCK CRUSHES LIZARD\nLIZARD POISONS SPOCK\nSPOCK SMASHES SCISSORS\nSCISSORS DECAPITATE LIZARD\nLIZARD EATS PAPER\nPAPER DISPROVES SPOCK\nSPOCK VAPORIZES ROCK\nROCK CRUSHES SCISSORS");
})

var move1 = "";
var move2 = "";
//indic variables used to manually prevent certain functions from happening more than once
var indic = 0;
var indicColors1 = 0;
var indicColors2 = 0;

database.ref().on("value", function(snapshot) {
	if (sessionStorage.getItem("playerNum") == "1") {
		$(".yrName").text(snapshot.val().playerInfo.name1);
		$(".opName").text(snapshot.val().playerInfo.name2);
		$("#yrName").text(snapshot.val().playerInfo.name1);
		$("#opName").text(snapshot.val().playerInfo.name2);
		$("#yrWins").text(snapshot.val().playerInfo.score1);
		$("#opWins").text(snapshot.val().playerInfo.score2);
		$("#message").text(snapshot.val().status1.message1);
		$("#yrChoice").text(snapshot.val().visible1.visible1);
		$("#opChoice").text(snapshot.val().visible2.visible2);
		$("#hidden1").text(snapshot.val().move1.move1);
		$("#hidden2").text(snapshot.val().move2.move2);
		$("#numPlayers").text(snapshot.val().playerInfo.numPlayers);

		function restartColors() {
			$("#rock").css("background-color", "transparent");
	    	$("#paper").css("background-color", "transparent");
	    	$("#scissors").css("background-color", "transparent");
	    	$("#lizard").css("background-color", "transparent");
	    	$("#spock").css("background-color", "transparent");
	    	$("#hidden1").text("");
	    	$("#hidden2").text("");
	    	indic = 0;
			}

		function restartClicks() {
			setTimeout(action1, 4000);
			setTimeout(function(){
				$(".selectChoice").attr("class", "row selectChoice hvr-bounce-in");
			}, 4000);
		}

		if (indicColors1 == 0){
			if (snapshot.val().visible2.visible2 == "rock") {
			 	$("#rock").css("background-color", "red");
			 	restartClicks();
			 	setTimeout(restartColors, 4000);
			 	indicColors1++;
			 } else if (snapshot.val().visible2.visible2 == "paper") {
			 	$("#paper").css("background-color", "red");
			 	restartClicks();
			 	setTimeout(restartColors, 4000);
			 	indicColors1++;
			 } else if (snapshot.val().visible2.visible2 == "scissors") {
			 	$("#scissors").css("background-color", "red");
			 	restartClicks();
			 	setTimeout(restartColors, 4000);
			 	indicColors1++;
			 } else if (snapshot.val().visible2.visible2 == "lizard") {
			 	$("#lizard").css("background-color", "red");
			 	restartClicks();
			 	setTimeout(restartColors, 4000);
			 	indicColors1++;
			 } else if (snapshot.val().visible2.visible2 == "spock") {
			 	$("#spock").css("background-color", "red");
			 	restartClicks();
			 	setTimeout(restartColors, 4000);
			 	indicColors1++;
			 }
		}

		$("#clickToStart").click(function() {
			action1();
			$(".selectChoice").attr("class", "row selectChoice hvr-bounce-in");
		});

		function action1() {
			$("#rock").on("click", function() {rock1()});
			$("#paper").on("click", function() {paper1()});
			$("#scissors").on("click", function() {scissors1()});
			$("#lizard").on("click", function() {lizard1()});
			$("#spock").on("click", function() {spock1()});
			$("#clickToStart").text("");
		}

		function nextRound1() {
			database.ref("move1").set({
				move1: "0"
	    	});
	    	database.ref("move2").set({
				move2: "0"
	    	});
	    	database.ref("visible1").set({
				visible1: ""
	    	});
	    	database.ref("visible2").set({
				visible2: ""
	    	});
	    	database.ref("status1").set({
	    		message1: ""
	    	});
	    	database.ref("status2").set({
	    		message2: ""
	    	});
	    	$("#rock").css("background-color", "transparent");
	    	$("#paper").css("background-color", "transparent");
	    	$("#scissors").css("background-color", "transparent");
	    	$("#lizard").css("background-color", "transparent");
	    	$("#spock").css("background-color", "transparent");
	    	$("#hidden1").text("");
	    	$("#hidden2").text("");
	    	$(".selectChoice").attr("class", "row selectChoice hvr-bounce-in");
	    	indic = 0;
	    	action1();
		}

		function win1() {
			if (indic == 0) {	
				database.ref("playerInfo").set({
					name1: $("#yrName").text(),
					name2: $("#opName").text(),
					score1: parseInt($("#yrWins").text()) + 1,
					score2: $("#opWins").text(),
				    numPlayers: $("#numPlayers").text()
			    });
			    database.ref("status1").set({
			    	message1: "You win!"
			    });
			    database.ref("status2").set({
						message2: "You lose!"
					});
			    database.ref("visible1").set({
			    	visible1: $("#hidden1").text(),
			    });
			    database.ref("visible2").set({
			    	visible2: $("#hidden2").text(),
			    });
			    setTimeout(nextRound1, 4000);
			    indic++;
		   	}
		}

		function lose1() {
			if (indic == 0) {	
				database.ref("playerInfo").set({
					name1: $("#yrName").text(),
					name2: $("#opName").text(),
					score1: $("#yrWins").text(),
					score2: parseInt($("#opWins").text()) + 1,
				    numPlayers: $("#numPlayers").text()
			    });
			    database.ref("status1").set({
			    	message1: "You lose!"
			    });
			    database.ref("status2").set({
						message2: "You win!"
					});
			    database.ref("visible1").set({
			    	visible1: $("#hidden1").text(),
			    });
			    database.ref("visible2").set({
			    	visible2: $("#hidden2").text(),
			    });
			    setTimeout(nextRound1, 4000);
			   indic++;
			}
		}

		function pickRock1(move2) {
			if (move2 == "rock") {
				database.ref("status1").set({
					message1: "You tied!"
				});
				database.ref("status2").set({
					message2: "You tied!"
				});
				database.ref("visible1").set({
		    		visible1: $("#hidden1").text()
		    	});
		    	database.ref("visible2").set({
		    		visible2: $("#hidden2").text()
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
			if (move2 == "rock") {
				win1();
			} else if (move2 == "paper") {
				database.ref("status1").set({
					message1: "You tied!"
				});
				database.ref("status2").set({
					message2: "You tied!"
				});
				database.ref("visible1").set({
		    		visible1: $("#hidden1").text()
		    	});
			    database.ref("visible2").set({
			    	visible2: $("#hidden2").text()
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
				database.ref("visible1").set({
		    		visible1: $("#hidden1").text()
		    	});
		    	database.ref("visible2").set({
		    		visible2: $("#hidden2").text()
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
				database.ref("visible1").set({
		    		visible1: $("#hidden1").text()
		    	});
		    	database.ref("visible2").set({
		    		visible2: $("#hidden2").text()
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
				database.ref("visible1").set({
		    		visible1: $("#hidden1").text()
		    	});
		    	database.ref("visible2").set({
		    		visible2: $("#hidden2").text()
		    	});
				setTimeout(nextRound1, 4000);
			}
		}

		function compare1() {
			var move1 = $("#hidden1").text();
			var move2 = $("#hidden2").text();
			indicColors1 = 0;
			if (move1 !== "0" && move2 !== "0") {
				if (move1 == "rock") {
					pickRock1(move2);
				} else if (move1 == "paper") {
					pickPaper1(move2);
				} else if (move1 == "scissors") {
					pickScissors1(move2);
				} else if (move1 == "lizard") {
					pickLizard1(move2);
				} else if (move1 == "spock") {
					pickSpock1(move2);
				}
			}
		}

		function rock1() {
			database.ref("move1").set({
			    move1: "rock"
			});
			$("#rock").css("background-color", "#FFA500");
			$("#rock").off("click");
			$("#paper").off("click");
			$("#scissors").off("click");
			$("#lizard").off("click");
			$("#spock").off("click");
			document.getElementById("rockSound").play();
			$(".selectChoice").attr("class", "row selectChoice");
			compare1();
		}

		function paper1() {
			database.ref("move1").set({
			    move1: "paper"
			});
			$("#paper").css("background-color", "#FFA500");
			$("#rock").off("click");
			$("#paper").off("click");
			$("#scissors").off("click");
			$("#lizard").off("click");
			$("#spock").off("click");
			document.getElementById("paperSound").play();
			$(".selectChoice").attr("class", "row selectChoice");
			compare1();
		}

		function scissors1() {
			database.ref("move1").set({
			    move1: "scissors"
			});
			$("#scissors").css("background-color", "#FFA500");
			$("#rock").off("click");
			$("#paper").off("click");
			$("#scissors").off("click");
			$("#lizard").off("click");
			$("#spock").off("click");
			document.getElementById("scissorsSound").play();
			$(".selectChoice").attr("class", "row selectChoice");
			compare1();
		}

		function lizard1() {
			database.ref("move1").set({
			    move1: "lizard"
			});
			$("#lizard").css("background-color", "#FFA500");
			$("#rock").off("click");
			$("#paper").off("click");
			$("#scissors").off("click");
			$("#lizard").off("click");
			$("#spock").off("click");
			document.getElementById("lizardSound").play();
			$(".selectChoice").attr("class", "row selectChoice");
			compare1();
		}

		function spock1() {
			database.ref("move1").set({
			    move1: "spock"
			});
			$("#spock").css("background-color", "#FFA500");
			$("#rock").off("click");
			$("#paper").off("click");
			$("#scissors").off("click");
			$("#lizard").off("click");
			$("#spock").off("click");
			document.getElementById("spockSound").play();
			$(".selectChoice").attr("class", "row selectChoice");
			compare1();
		}
	}

	if (sessionStorage.getItem("playerNum") == "2") {
		$(".yrName").text(snapshot.val().playerInfo.name2);
		$(".opName").text(snapshot.val().playerInfo.name1);
		$("#yrName").text(snapshot.val().playerInfo.name2);
		$("#opName").text(snapshot.val().playerInfo.name1);
		$("#yrWins").text(snapshot.val().playerInfo.score2);
		$("#opWins").text(snapshot.val().playerInfo.score1);
		$("#message").text(snapshot.val().status2.message2);
		$("#yrChoice").text(snapshot.val().visible2.visible2);
		$("#opChoice").text(snapshot.val().visible1.visible1);
		$("#hidden1").text(snapshot.val().move1.move1);
		$("#hidden2").text(snapshot.val().move2.move2);
		$("#numPlayers").text(snapshot.val().playerInfo.numPlayers);

		function restartColors() {
			$("#rock").css("background-color", "transparent");
	    	$("#paper").css("background-color", "transparent");
	    	$("#scissors").css("background-color", "transparent");
	    	$("#lizard").css("background-color", "transparent");
	    	$("#spock").css("background-color", "transparent");
	    	$("#hidden1").text("");
	    	$("#hidden2").text("");
	    	indic = 0;
		}

		function restartClicks() {
			setTimeout(action2, 4000);
			setTimeout(function() {
				$(".selectChoice").attr("class", "row selectChoice hvr-bounce-in");
			}, 4000);
		}

		if (indicColors2 == 0) {
			if (snapshot.val().visible1.visible1 == "rock") {
			 	$("#rock").css("background-color", "red");
			 	restartClicks();
			 	setTimeout(restartColors, 4000);
			 	indicColors2++;
			 } else if (snapshot.val().visible1.visible1 == "paper") {
			 	$("#paper").css("background-color", "red");
			 	restartClicks();
			 	setTimeout(restartColors, 4000);
			 	indicColors2++;
			 } else if (snapshot.val().visible1.visible1 == "scissors") {
			 	$("#scissors").css("background-color", "red");
			 	restartClicks();
			 	setTimeout(restartColors, 4000);
			 	indicColors2++;
			 } else if (snapshot.val().visible1.visible1 == "lizard") {
			 	$("#lizard").css("background-color", "red");
			 	restartClicks();
			 	setTimeout(restartColors, 4000);
			 	indicColors2++;
			 } else if (snapshot.val().visible1.visible1 == "spock") {
			 	$("#spock").css("background-color", "red");
			 	restartClicks();
			 	setTimeout(restartColors, 4000);
			 	indicColors2++;
			}
		}

		function compare2() {
			var move2 = $("#hidden2").text();
			var move1 = $("#hidden1").text();
			indicColors2 = 0;
			if (move1 !== "0" && move2 !== "0"){
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
		}

		$("#clickToStart").click(function() {
			action2();
			$(".selectChoice").attr("class", "row selectChoice hvr-bounce-in");
		});

		function action2() {
			$("#rock").on("click", function() {rock2()});
			$("#paper").on("click", function() {paper2()});
			$("#scissors").on("click", function() {scissors2()});
			$("#lizard").on("click", function() {lizard2()});
			$("#spock").on("click", function() {spock2()});
			$("#clickToStart").text("");
		}

		function rock2() {
			database.ref("move2").set({
			    move2: "rock"
			});
			$("#rock").css("background-color", "#FFA500");
			$("#rock").off("click");
			$("#paper").off("click");
			$("#scissors").off("click");
			$("#lizard").off("click");
			$("#spock").off("click");
			document.getElementById("rockSound").play();
			$(".selectChoice").attr("class", "row selectChoice");
			compare2();
		}

		function paper2() {
			database.ref("move2").set({
			    move2: "paper"
			});
			$("#paper").css("background-color", "#FFA500");
			$("#rock").off("click");
			$("#paper").off("click");
			$("#scissors").off("click");
			$("#lizard").off("click");
			$("#spock").off("click");
			document.getElementById("paperSound").play();
			$(".selectChoice").attr("class", "row selectChoice");
			compare2();
		}

		function scissors2() {
			database.ref("move2").set({
			    move2: "scissors"
			});
			$("#scissors").css("background-color", "#FFA500");
			$("#rock").off("click");
			$("#paper").off("click");
			$("#scissors").off("click");
			$("#lizard").off("click");
			$("#spock").off("click");
			document.getElementById("scissorsSound").play();
			$(".selectChoice").attr("class", "row selectChoice");
			compare2();
		}

		function lizard2() {
			database.ref("move2").set({
			    move2: "lizard"
			});
			$("#lizard").css("background-color", "#FFA500");
			$("#rock").off("click");
			$("#paper").off("click");
			$("#scissors").off("click");
			$("#lizard").off("click");
			$("#spock").off("click");
			document.getElementById("lizardSound").play();
			$(".selectChoice").attr("class", "row selectChoice");
			compare2();
		}

		function spock2() {
			database.ref("move2").set({
			    move2: "spock"
			});
			$("#spock").css("background-color", "#FFA500");
			$("#rock").off("click");
			$("#paper").off("click");
			$("#scissors").off("click");
			$("#lizard").off("click");
			$("#spock").off("click");
			document.getElementById("spockSound").play();
			$(".selectChoice").attr("class", "row selectChoice");
			compare2();
		}

		function nextRound2() {
			database.ref("move1").set({
				move1: "0"
	    	});
	    	database.ref("move2").set({
				move2: "0"
	    	});
	    	database.ref("visible1").set({
				visible1: ""
	    	});
	    	database.ref("visible2").set({
				visible2: ""
	    	});
	    	database.ref("status1").set({
	    		message1: ""
	    	});
	    	database.ref("status2").set({
	    		message2: ""
	    	});
			$("#rock").css("background-color", "transparent");
	    	$("#paper").css("background-color", "transparent");
	    	$("#scissors").css("background-color", "transparent");
	    	$("#lizard").css("background-color", "transparent");
	    	$("#spock").css("background-color", "transparent");
	    	$("#hidden1").text("");
	    	$("#hidden2").text("");
	    	$(".selectChoice").attr("class", "row selectChoice hvr-bounce-in");
	    	indic = 0;
	    	action2();
		}

		function win2() {
			if (indic == 0) {
			    database.ref("status2").set({
			    	message2: "You win!"
			    });
			    database.ref("status1").set({
			    	message1: "You lose!"
			    });	
				database.ref("playerInfo").set({
					name1: $("#opName").text(),
					name2: $("#yrName").text(),
					score1: $("#opWins").text(),
					score2: parseInt($("#yrWins").text()) + 1,
				    numPlayers: $("#numPlayers").text()
			    });
			    database.ref("visible1").set({
			    	visible1: $("#hidden1").text()
			    });
			    database.ref("visible2").set({
			    	visible2: $("#hidden2").text()
			    });
			    setTimeout(nextRound2, 4000);
			    indic++;
			}
		}

		function lose2() {
			if (indic == 0) {
			    database.ref("status2").set({
			    	message2: "You lose!"
			    });
			    database.ref("status1").set({
			    	message1: "You win!"
			    });	
				database.ref("playerInfo").set({
					name1: $("#opName").text(),
					name2: $("#yrName").text(),
					score1: parseInt($("#opWins").text()) + 1,
					score2: $("#yrWins").text(),
				    numPlayers: $("#numPlayers").text()
			    });
			    database.ref("visible1").set({
			    	visible1: $("#hidden1").text()
			    });
			    database.ref("visible2").set({
			    	visible2: $("#hidden2").text()
			    });
			    setTimeout(nextRound2, 4000);
			    indic++;
			}
		}

		function pickRock2(move1) {
			if (move1 == "rock") {
				database.ref("status1").set({
					message1: "You tied!"
				});
				database.ref("status2").set({
					message2: "You tied!"
				});
				database.ref("visible1").set({
		    		visible1: $("#hidden1").text()
		    	});
			    database.ref("visible2").set({
			    	visible2: $("#hidden2").text()
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
				database.ref("visible1").set({
		    		visible1: $("#hidden1").text()
		    	});
		    	database.ref("visible2").set({
		    		visible2: $("#hidden2").text()
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
				database.ref("visible1").set({
		    		visible1: $("#hidden1").text()
		    	});
		    	database.ref("visible2").set({
		    		visible2: $("#hidden2").text()
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
					   	database.ref("visible1").set({
		    	visible1: $("#hidden1").text()
		    });
		    database.ref("visible2").set({
		    	visible2: $("#hidden2").text()
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
				database.ref("visible1").set({
		    		visible1: $("#hidden1").text()
		    	});
		    	database.ref("visible2").set({
		    		visible2: $("#hidden2").text()
		    	});
			    setTimeout(nextRound2, 4000);
			}
		}
	}

	//deletes player from Firebase when window is closed
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
				move1: "0",
	    	});
	    	database.ref("move2").set({
				move2: "0",
	    	});
		    database.ref("visible1").set({
		    	visible1: ""
		    });
		    database.ref("visible2").set({
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
				move1: "0",
	    	});
	    	database.ref("move2").set({
				move2: "0",
	    	});
		    database.ref("visible1").set({
		    	visible1: ""
		    });
		    database.ref("visible2").set({
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
	}
});

var soundTrigger = true;

//creates a chat message and sends it to Firebase
function chat() {
	soundTrigger = false;
	database.ref("chat").push({
		content: "<span class=\"chatName\">" + $("#yrName").text() + "</span>: " + $("#chatInput").val()
	});
	$("#chatInput").val("");
}

//when a chat message is added to Firebase, it gets displayed in the DOM
database.ref("chat").on("child_added", function(snapshot) {
	$("#chatContent").append("<br>" + snapshot.val().content);
	if (soundTrigger) {
		document.getElementById("chatBell").play();
	}
	soundTrigger = true;
	$("#chatContent").scrollTop($("#chatContent")[0].scrollHeight);
});

$("#chatSubmit").on("click touchstart", function() {chat()});

//makes chat submit with enter key
$(document).keypress(function(event) {
	if (event.which == 13) {
		event.preventDefault();
		chat();
	}
});
});
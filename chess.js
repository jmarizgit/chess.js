$(function(){
	
	//configuration object
	var $config = {
		debug	: true,		//true or false (console logs)
		player1	: 0,		//0 - white, 1 - black
		player2 : 1,		//0 - white, 1 - black
		mode	: "knight",	//knight (find game) or chess (full game)
		boardX 	: 8,
		boardY 	: 8,
		board	: [],		//save board positions
		active	: [],		//mode = knight - places to go over, mode = game - active pieces
		removed : [],		//mode = knight - removed tiles, mode = game - removed pieces
		paths	: [],		//copy removed list after search is completed
		pieces 	: {	//chess pieces in unicode (0 = white, 1 = black)
			king  : ["9812","9818"],
			queen : ["9813","9819"],
			rook  : ["9814","9820"],
			bishop: ["9815","9821"],
			knight: ["9816","9822"],
			pawn  : ["9817","9823"]
		}//pieces
	}//config
	
	
//	check for debug mode	
	if(!$config.debug) console.log = function(){};
	
	
//	build board
	$("#board").ready(function(){

		var i,x,y,z,alpha;
		
		console.log("BUILDING BOARD:");
		
		//create board
		for(i=1, y=8; y >= 1; --y, ++i){
			for(x=65, z=1; x <= 72; ++x, ++i, ++z){
				
				alpha = String.fromCharCode(x);
				console.log(y+alpha+" - "+z+"_"+y);
				
				$config.board.push(z+"_"+y); //include positions on $config object
				
				//black and white tiles
				if( i%2 == 0){
					$("#board").append("<dd id='"+z+"_"+y+"' target='"+alpha+y+"'></dd>");
				}else{
					$("#board").append("<dt id='"+z+"_"+y+"' target='"+alpha+y+"'></dt>");
				}//if
				
			}//for x			
		}//for y
		
	});//ready()
	
	
//	place pieces on board
	$("#H1").ready(function(){	//H1 is the last position on the board
		
		$("#wrapper").fadeIn(1000);
		
		console.log("board rendered, placing pieces");
		
		//checking for game mode
		if($config.mode == "knight"){
			
			console.log("mode knight");
			modeKnight();
			
		}else if($config.mode == "chess"){
			
			console.log("mode chess");
			//modeChess();
		}
	});
	
	
//	move pieces
	var moveKnight = function($from, $to){
		
	}	
	
	
	

	//create game in mode knight
	var modeKnight = function(){
		
		var pknight = random($config.board.length-1), //random number for knight position
			pking = random($config.board.length-1); //random number for king position
		
		//place knight
		placePiece(	$config.pieces.knight[$config.player1], 
					$config.board[pknight]);
		//make knight piece active
		$("#"+$config.board[pknight]).addClass("knight");
		$config.active.push($config.board[pknight]);
		
		//place king
		placePiece(	$config.pieces.king[$config.player2], 
					$config.board[pking]);

	};//modeKnight()
	
	
	//place piece on board
	var placePiece = function($piece, $position){
		$("#"+$position).html("&#"+$piece).addClass($piece);
	};//placePiece()
	
	
	//generates random numbers
	var random = function($range){
		if(arguments.length == 1) return Math.floor(Math.random()*$range);
	};//random()
	
	
	
	
	//TESTS - DELETE LATER
	$("#board dd, #board dt").live("click",function(){
		
		if($(this).hasClass("active"))
			$(this).css("background","white").removeClass("active");
		else{
			$(this).css("background","red").addClass("active");	
		}
	}).live("mouseover", function(){
		if( !$(this).hasClass("active")) $(this).css("background","green");
	}).live("mouseout", function(){
		if( !$(this).hasClass("active")) $(this).css("background","white");
	});
	
	
	console.log($config);
});//function()
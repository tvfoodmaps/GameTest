var GameView  = require('gameView');   	

// First scene that the game load on first time startup.
	
var scene = "MainScene";	

// Create game instance. We pass as argument the currentWindow in order to handle App events.
		
var game = new GameView($.win, scene);      

// Add game to window. 

$.win.add(game);
	      
// Open the window
	      
$.win.open();	      
	     
	
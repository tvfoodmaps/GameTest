module.exports = function(win,firstScene){
	var platino = require('io.platino');
	var game = platino.createGameView({
		fps:30,                                                 // Game frame rate. Set 30fps for Iphone4, iPad1 and old android devices
		debug:true,                                            // Enable debug logs
		usePerspective:false                                    // Sets/gets viewpoint type of the GameView (perspective or orthogonal).
	});
	game.color(1, 1, 1);                                    	 // set initial background color to white

	game.TARGET_SCREEN = {height:1536,width:2048};

	function onGameActivated(e){

	 	Ti.API.info('Game Onload');
	/*
	 * [INFO] :   Screen scale 0.5
[INFO] :   view size: 1024x768
[INFO] :   game screen size before: 2048x1536
[INFO] :   game screen size after: 2048x1536

	 */
		var screenScale = game.size.height / game.TARGET_SCREEN.height;
		Ti.API.info("Screen scale "+screenScale);
		Ti.API.info("view size: " + game.size.width + "x" + game.size.height);
		Ti.API.info("game screen size before: " + game.screen.width + "x" + game.screen.height);
		game.screen = {width:game.size.width / screenScale, height:game.size.height / screenScale};
		Ti.API.info("game screen size after: " + game.screen.width + "x" + game.screen.height);

		game.offset = (game.screen.width - game.TARGET_SCREEN.width)/2;

		game.screenScale = game.screen.height / game.TARGET_SCREEN.height;
		

		var MainScene  = require(firstScene);   			// Import the MainScene module into the current scope
		game.currentScene = new MainScene(win, game);       // Set MainScene as the current scene

		game.pushScene(game.currentScene);                  // Pushes the specified Scene instance into the scene stack (places it at the very top). The scene (now at the top) will then become the currently shown (active) scene.
		game.start();                                       // Starts the game


	};

	game.oX=function(x){
		return x+game.offset;
	};

	game.addEventListener('onload', onGameActivated);


	return game;
};

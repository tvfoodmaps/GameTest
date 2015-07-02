var platino = require('io.platino');

module.exports = function(win,game){
	Ti.API.info("scene called");
	// Declare the scene:

	function onSceneActivated(e) {

		// When scene is activated, starts the creation of all objects
		Ti.API.info("Main scene is activated");
	}

	var self = platino.createScene();
	self.addEventListener('activated', onSceneActivated);

	var background = platino.createSprite({image:'images/Background.png', center:{x:game.screen.width/2,y:game.screen.height/2}, height:1536, width:2048 });
	//game.setupSpriteSize(background);
	self.add(background);
	
	var selectedItem;
	var item1 = platino.createSprite({image:'images/item_blue.png', center:{x:game.screen.width/2,y:game.screen.height/2}, height:248, width:248 });

	item1.addEventListener('touchstart',function(e){
		//Ti.API.info("touch start of item1"+JSON.stringify(e));
		selectedItem = item1;
	});
	
	item1.addEventListener('touchmove',function(e){
		//Ti.API.info("Touch move "+JSON.stringify(e));
		//this is working better but it's VERY choppy
		selectedItem.moveCenter(e.sceneX,e.sceneY); 		//tried e.x and e.x*game.screenScale
		
	//	item1.x = e.x;
	//	item1.y = e.y;
	});
	
	item1.addEventListener('touchend',function(e){
		//Ti.API.info("touch end of item1"+JSON.stringify(e));
		selectedItem = null;
	});

	self.add(item1);

	// Scene background color to white :

	self.color(1, 1, 1);
	return self;
};
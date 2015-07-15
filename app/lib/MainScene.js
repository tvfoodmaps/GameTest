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

	var background = platino.createSprite({image:'images/Background.png', x:game.oX(0), y:0, height:1536, width:2048 });
	//game.setupSpriteSize(background);
	self.add(background);

	var shelf = platino.createSprite({image:'images/shelf.png', x:game.oX(0), y:850,z:2 });
	//game.setupSpriteSize(background);
	self.add(shelf);



	Ti.API.info("background width: "+background.width);
	var DragItem = require('DragItem');
	var dItem1 = new DragItem(50,1200,game,self);
	var dItem2 = new DragItem(300,1200,game,self);


	var dropZones = [];
	var DropItem = require('DropItem');
	var drop1 = new DropItem(800,650,game,self);
	var drop2 = new DropItem(1200,650,game,self);

	dropZones.push(drop1);
	dropZones.push(drop2);

	var selectedItem;

	self.setSelectedItem=function(item){
		selectedItem = item;
	};

	self.addEventListener('touchmove',function(e){
		//Ti.API.info("Touch move "+JSON.stringify(e));
		if (selectedItem) {
			selectedItem.moveCenter(e.x,e.y);
		}
	});

	self.addEventListener('touchend',function(e){
		if (selectedItem){
			Ti.API.info("touch end of item1"+JSON.stringify(e));
			var foundZone = false;
			for (var i = 0; i < dropZones.length; i++){
				if (dropZones[i].contains(e.x,e.y)){
					//alert("Dropped!"); 
					dropZones[i].fillGlass();
					selectedItem.returnHome();
					foundZone = true;
				}
			}
			if (!foundZone){
				selectedItem.returnHome();
			}
			selectedItem = null;
		}
	});

	self.add(dItem1);
	self.add(dItem2);
	self.add(drop1);
	self.add(drop2);
	// Scene background color to white :

	self.color(1, 5, 1);
	return self;
};

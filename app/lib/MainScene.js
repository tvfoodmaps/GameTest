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
	self.add(background);

	var shelf = platino.createSprite({image:'images/shelf.png', x:game.oX(0), y:850,z:2 });
	self.add(shelf);

	var scoreLabel = platino.createTextSprite({text:'Score: ', fontSize:80, x:game.oX(200), y:50, z:2});
	scoreLabel.color(0.5,0.25,0.66);	//font color

	var meter = platino.createCanvasSprite({x:game.oX(600), y:70, width:400, height:50,z:2});
	meter.setStrokeWidth(4);
	meter.color(0.5,0.25,0.66);
	meter.drawRect(0,0,400,50);

	var innerMeter = platino.createCanvasSprite({x:game.oX(602), y:70, width:0, height:50,z:5});
	innerMeter.color(0.99,0.33,0.33);
	innerMeter.fillRect(0,0,400,50);

	Ti.API.info("background width: "+background.width);
	var DragItem = require('DragItem');
	var PourItem = require('PourItem');
	var dItem1 = new DragItem(300,1200,game,self);
	var dItem2 = new PourItem(550,1200,game,self);


	var dropZones = [];
	var pourZones = [];
	var DropItem = require('DropItem');
	var PourRecvItem = require('PourRecvItem');
	var drop1 = new DropItem(800,650,game,self);
	var pour1 = new PourRecvItem(1200,650,game,self);

	dropZones.push(drop1);
	pourZones.push(pour1);

	var TimedItem = require('TimedItem');
	var juicer = new TimedItem(20,1200,game,self);

	var selectedItem;
	var pourReceiver;
	var isPouring = false;
	var pourStart;

	self.setSelectedItem=function(item){
		selectedItem = item;
	};

	self.addEventListener('touchmove',function(e){
		//Ti.API.info("Touch move "+JSON.stringify(e));
		if (selectedItem) {
			selectedItem.moveCenter(e.x,e.y);
		}
		if (selectedItem && selectedItem.isPourItem() && isPouring==false){
			for (var i = 0; i < pourZones.length; i++){
				if (pourZones[i].contains(e.x,e.y)){
					isPouring=true;
					pourStart = Date.now();
					Ti.API.info("poring started "+pourStart);
					pourReceiver = pourZones[i];
				}
			}
		}
	});

  var score = 0;
	self.addEventListener('touchend',function(e){
		if (selectedItem && selectedItem.isPourItem() == false ){
			Ti.API.info("touch end of item1"+JSON.stringify(e));
			var foundZone = false;
			for (var i = 0; i < dropZones.length; i++){
				if (dropZones[i].contains(e.x,e.y)){
					//alert("Dropped!");
					dropZones[i].fillGlass();
					selectedItem.returnHome();
					//move meter
					var transform  = platino.createTransform();
					transform.duration = 600;
					score += 100;
					transform.width = score;
					transform.opacity = 1;
					transform.easing = platino.ANIMATION_CURVE_EASE_IN;
					innerMeter.transform(transform);

					foundZone = true;
				}
			}
			if (!foundZone){
				selectedItem.returnHome();
			}
			selectedItem = null;
		}
		else if (selectedItem && selectedItem.isPourItem() == true){
			if(isPouring==true){
				isPouring = false;
				var timePouring = Date.now() - pourStart;
				Ti.API.info("Pouring time "+timePouring);
				pourReceiver.fillGlass();
				pourReceiver = null;
			}
			selectedItem.returnHome();
		}
	});

	self.add(dItem1);
	self.add(dItem2);
	self.add(drop1);
	self.add(pour1);
	self.add(scoreLabel);
	self.add(meter);
	self.add(innerMeter);
	self.add(juicer);
	// Scene background color to white :

	self.color(1, 1, 1);
	return self;
};

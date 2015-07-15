var platino = require('io.platino');

module.exports = function(x,y,game,scene){
	
	var startx = game.oX(x);
	var starty = y;
	
	var item = platino.createSprite({image:'images/bottle.png', x:startx,y:starty,z:5 });

	item.addEventListener('touchstart',function(e){
		Ti.API.info("touch start of item1"+JSON.stringify(e));
		scene.setSelectedItem(item);
	});
	
	item.returnHome=function(){
		var transform  = platino.createTransform();  //snap back 
		transform.x = startx;
		transform.y = starty;
		transform.duration = 300;
		item.transform(transform);
		//need to clear transform?		
	};
	
	return item;
};
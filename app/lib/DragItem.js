var platino = require('io.platino');

module.exports = function(x,y,game,scene){
	
	var startx = x;
	var starty = y;
	
	var item = platino.createSprite({image:'images/item_blue.png', x:startx,y:starty,z:2,height:248, width:248 });

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
var platino = require('io.platino');

module.exports = function(x,y,game,scene){

	var startx = game.oX(x);
	var starty = y;

	var item = platino.createSprite({image:'images/item_blue.png', x:startx,y:starty,z:4 });
  item.color(.9,.9,0);

	item.addEventListener('touchstart',function(e){
		Ti.API.info("touch start of TimedItem"+JSON.stringify(e));
    item.color(1,1,1);
	});



	return item;
};

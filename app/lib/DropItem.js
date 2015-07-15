var platino = require('io.platino');

module.exports = function(x,y,game,scene){

	//x cooridinate needs to be adjusted for different ratios
	var dropitem = platino.createSprite({image:'images/item_blue.png', x:game.oX(x),y:y,z:1, height:248, width:248 });
	dropitem.alpha = .25;
	
	
	return dropitem;	

};

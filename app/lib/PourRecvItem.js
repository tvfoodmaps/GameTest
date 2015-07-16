var platino = require('io.platino');

module.exports = function(x,y,game,scene){

	//x cooridinate needs to be adjusted for different ratios
	var dropitem = platino.createSpriteSheet({image:'images/glass_sheet.png',x:game.oX(x),y:y,z:3,height:375,width:252 });
	Ti.API.info("frame count "+dropitem.frameCount);
	dropitem.frame = 1;

	dropitem.fillGlass=function(){
		dropitem.frame = 0;
	};

	return dropitem;

};

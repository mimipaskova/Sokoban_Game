
var Wall = function(x, y, color) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.size = {x: 64,y: 64};
	this.drawMethod = "fillRect";
}

var Player = function(x, y, color) {
	this.x = x;
	this.y = y;
	this.size = {x: 64,y: 64};
	this.color = color;
	this.drawMethod = "circle";
}

var Box = function(x, y, color) {
	this.x = x;
	this.y = y;
	this.size = {x: 64,y: 64};
	this.color = color;
	this.drawMethod = "fillHalfRect";
}

var Goal = function(x, y, color) {
	this.x = x;
	this.y = y;
	this.size = {x: 64,y: 64};
	this.color = color;
	this.drawMethod = "fillRect";
}
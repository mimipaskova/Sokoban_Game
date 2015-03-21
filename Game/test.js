var canvas;
var context;

var CELL_WIDTH = 64;
var CELL_HEIGHT = 64;
var table = [[1, 1, 1, 1, 1, 1, 1],
			 [1, 0, 0, 0, 0, 0, 1],
			 [1, 0, 3, 0, 2, 0, 1],
			 [1, 0, 9, 0, 0, 0, 1],
			 [1, 0, 3, 0, 2, 0, 1],
			 [1, 0, 0, 0, 0, 0, 1],
			 [1, 1, 1, 1, 1, 1, 1]];

var level = [];
var player;
var wallCollection = [];
var boxCollection = [];
var goalCollection = [];

var isFree = function(x, y) {
	return !isWall(x, y) && !isBox(x, y);
}

var isWall = function(x, y) {
	return level[x][y] instanceof Wall;
}

var isBox = function(x, y) {
	return level[x][y] instanceof Box;
}

var move = function(toX, toY, object) {
	level[object.x][object.y] = null;
	object.x = toX;
	object.y = toY;
	level[toX][toY] = object;
}

var initLevel = function(table) {
	for (var i = 0; i < table.length; i++) {
		level.push(new Array(table[i].length));
	}
	for (var i = 0; i < table.length; i++) {
		for (var j = 0; j < table[i].length; j++) {
			switch(table[i][j]) {
				case 1:
					var wall = new Wall(j, i, "black");
					wallCollection.push(wall);
					level[j][i] = wall;
					break;
				case 2:
					var goal = new Goal(j, i, "red");
					goalCollection.push(goal);
					level[j][i] = goal;
					break;
				case 3:
					var box = new Box(j, i, "blue");
					boxCollection.push(box);
					level[j][i] = box;
					break;
				case 9:
					player = new Player(j, i, "orange");
					// playerCollection.push(player);
					level[j][i] = player;
					break;
				case 0:
					level[j][i] = null;
					break;
			}
		};
	};

}

var handleInput = function (event) {
	var x = player.x;
	var y = player.y;
	//left
	if (event.keyCode == 37) {
		if (isFree(x - 1, y)){
			move(x - 1, y, level[x][y]);
		}
		if (isBox(x - 1, y) && isFree(x - 2, y)) {
			move(x - 2, y, level[x - 1][y]);
			move(x - 1, y, level[x][y]);
		}
	}
	//up
	else if (event.keyCode == 38) {
		if(isFree(x, y - 1)){
			move(x, y - 1, level[x][y]);
		}
		if (isBox(x, y - 1) && isFree(x, y - 2)) {
			move(x, y - 2, level[x][y - 1]);
			move(x, y - 1, level[x][y]);
		}
	}
	//right
	else if (event.keyCode == 39) {
		if(isFree(x + 1, y)){
			move(x + 1, y, level[x][y]);
		}
		if (isBox(x + 1, y) && isFree(x + 2, y)) {
			move(x + 2, y, level[x + 1][y]);
			move(x + 1, y, level[x][y]);
		}
	}
	//down
	else if (event.keyCode == 40) {
		if(isFree(x, y + 1)){
			move(x , y + 1, level[x][y]);
		}
		if (isBox(x, y + 1) && isFree(x, y + 2)) {
			move(x, y + 2, level[x][y + 1]);
			move(x, y + 1, level[x][y]);
		}
	}
}

var update = function () {
	render(context,
		   [
				wallCollection,
				goalCollection,
				boxCollection,
				[player]
		   ]);

	window.setTimeout(update, 1000/60);
}

var loadGame = function() {
	canvas = document.getElementById("gameCanvas");
	context = canvas.getContext("2d");
	
	window.addEventListener("keydown", handleInput, false);

	initLevel(table);

	update();
};

window.onload = loadGame;
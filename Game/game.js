var canvas;
var context;

var isLevelFinish = false;

var CELL_WIDTH = 64;
var CELL_HEIGHT = 64;

var table = [[1, 1, 1, 1, 1, 1, 1],
			 [1, 0, 0, 0, 0, 0, 1],
			 [1, 0, 3, 0, 2, 0, 1],
			 [1, 0, 9, 0, 0, 0, 1],
			 [1, 0, 3, 0, 2, 0, 1],
			 [1, 0, 0, 0, 0, 0, 1],
			 [1, 1, 1, 1, 1, 1, 1]];

var tableTwo = [[1, 1, 1, 1, 1, 1, 1],
			 [1, 2, 0, 0, 0, 2, 1],
			 [1, 0, 3, 3, 3, 0, 1],
			 [1, 0, 3, 9, 3, 0, 1],
			 [1, 2, 3, 3, 3, 2, 1],
			 [1, 2, 2, 0, 2, 2, 1],
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
	if(!level[x][y]) {
		return false;
	}
	return level[x][y].some(function(object) {
		return object instanceof Wall;
	});
}

var isBox = function(x, y) {
	if(!level[x][y]) {
		return false;
	}
	return level[x][y].some(function(object) {
		return object instanceof Box;
	});
}

var isGoal = function(x, y) {
	if(!level[x][y]) {
		return false;
	}
	return level[x][y].some(function(object) {
		return object instanceof Goal;
	});
}

var isPlaceStacked = function (x, y) {
	return (level[x][y] && level[x][y].length > 1);
}

var removeObject = function (x, y, objectToRemove) {
	if (level[x][y]) {
		level[x][y] = level[x][y].filter(function(object) {
			return !(object == objectToRemove);
		});
	}
}

var addObject = function (x, y, object) {
	if (!level[x][y]) {
		level[x][y] = [];
	}
	
	level[x][y].push(object);
}

var move = function(toX, toY, object) {
	// if(isPlaceStacked(object.x, object.y)) {
	removeObject(object.x, object.y, object);
	// }
	object.x = toX;
	object.y = toY;
	addObject(toX, toY, object);
}

var moveBox = function(toX, toY, fromX, fromY) {
	var box;
	for (var i = 0; i < level[fromX][fromY].length; i++) {
		if (level[fromX][fromY][i] instanceof Box) {
			box = level[fromX][fromY][i];
			break;
		}
	}
	if (!box) {
		return;
	}

	move(toX, toY, box);
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
					addObject(j, i, wall);
					break;
				case 2:
					var goal = new Goal(j, i, "red");
					goalCollection.push(goal);
					addObject(j, i, goal);
					break;
				case 3:
					var box = new Box(j, i, "blue");
					boxCollection.push(box);
					addObject(j, i, box);
					break;
				case 9:
					player = new Player(j, i, "orange");
					addObject(j, i, player);
					break;
				case 0:
					level[j][i] = null;
					break;
			}
		};
	};

}

var resetLevel = function(){
	level = [];
	player;
	wallCollection = [];
	boxCollection = [];
	goalCollection = [];
	table = tableTwo;
	isLevelFinish = false;
	initLevel(tableTwo);

}

var finishLevel = function() {
	for (var i = 0; i < goalCollection.length; i++) {
		var obj = goalCollection[i];
		if(!(level[obj.x][obj.y][1] instanceof Box)) {
			return false;
		}
	};
	return true;
}

var congrats = function() {
	if(finishLevel()){
		alert("Congrats");
		isLevelFinish = true;
		resetLevel();
	}
}

var handleInput = function (event) {
	var x = player.x;
	var y = player.y;
	//left
	if (event.keyCode == 37) {
		if (isFree(x - 1, y)){
			move(x - 1, y, player);
		}
		if (isBox(x - 1, y) && isFree(x - 2, y)) {
			moveBox(x - 2, y, x - 1, y);
			move(x - 1, y, player);
		}
	}
	//up
	else if (event.keyCode == 38) {
		if(isFree(x, y - 1)){
			move(x, y - 1, player);
		}
		if (isBox(x, y - 1) && isFree(x, y - 2)) {
			moveBox(x, y - 2, x, y - 1);
			move(x, y - 1, player);
		}
	}
	//right
	else if (event.keyCode == 39) {
		if(isFree(x + 1, y)){
			move(x + 1, y, player);
		}
		if (isBox(x + 1, y) && isFree(x + 2, y)) {
			moveBox(x + 2, y, x + 1, y);
			move(x + 1, y, player);
		}
	}
	//down
	else if (event.keyCode == 40) {
		if(isFree(x, y + 1)){
			move(x , y + 1, player);
		}
		if (isBox(x, y + 1) && isFree(x, y + 2)) {
			moveBox(x, y + 2, x, y + 1);
			move(x, y + 1, player);
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
	if(!isLevelFinish){
		congrats();		
	}
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
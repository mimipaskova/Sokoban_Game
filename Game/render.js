var drawMethods = {
	fillRect: function (context, x, y, size, color) {
		context.fillStyle = color;
		context.fillRect(x, y, size.x, size.y);
	},
	fillHalfRect: function (context, x, y, size, color) {
		context.fillStyle = color;
		context.fillRect(x + CELL_WIDTH/2 - size.x/4, y + CELL_HEIGHT/2 - size.y/4, size.x/2, size.y/2);
	},
	circle: function (context, x, y, size, color) {
		context.beginPath();
		context.fillStyle = color;
		context.arc(x + CELL_WIDTH/2, y + CELL_HEIGHT/2, size.x/2, 0, 2 * Math.PI);
		context.fill();
	}
};

var renderGrid = function(context) {
	for (var i = 0; i < table.length; i++) {
		for (var j = 0; j < table[i].length; j++) {
			context.strokeRect(i * CELL_WIDTH, j * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
		};
	};
};

var renderCollection = function(context, collection) {
	for (var i = 0; i < collection.length; i++) {
		var drawMethod = collection[i].drawMethod;
		drawMethods[drawMethod](context, collection[i].x * CELL_WIDTH, collection[i].y * CELL_HEIGHT, collection[i].size, collection[i].color);
	};
}

var render = function (context, collections) {
	context.clearRect(0, 0, 600, 500); // magic

	renderGrid(context);

	for (var i = 0; i < collections.length; i++) {
		renderCollection(context, collections[i]);
		context.restore();
	}
}

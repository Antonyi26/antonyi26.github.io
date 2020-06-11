// Field class, Cell class

class Field
{
	constructor(cnavasObj, rows, cols, backgroundColor)
	{
		this.rows = rows;
		this.cols = cols;
		this.cellList = [];
		this.cnavasObj = cnavasObj;
		this.backgroundColor = backgroundColor;
		this.borderColor = "#bbbbbb";
		this.mouse = {
			isdown: false,
			lastPoint: {i: 0, j: 0},
		};
				
		for (let i = 0; i < this.rows; i++)
		{
			let row = [];
			for (let j = 0; j < this.cols; j++)
			{
				row.push(new Cell(this, 0, 0, 0, 0));
			}
			this.cellList.push(row);
		}
			
		this.resize();
	}
	
	set width(val) {this.cnavasObj.width = val;}
	get width() {return this.cnavasObj.width}
	
	set height(val) {this.cnavasObj.height = val;}
	get height() {return this.cnavasObj.height}
	
	updateCells()
	{
		let dx = this.width / this.cols;
		let dy = this.height / this.rows;
			
		for (let i = 0; i < this.rows; i++)
		{
			let y = i * dy;
			for (let j = 0; j < this.cols; j++)
			{
				this.cellList[i][j].x = j * dx;
				this.cellList[i][j].dx = dx;
				this.cellList[i][j].y = y;
				this.cellList[i][j].dy = dy;
			}
		}
	}
	
	resize(w, h)
	{
		if(!w) w = this.width;
		if(!h) h = this.height;
		
		this.width = w;
		this.height = h;
		this.updateCells();
		this.draw();
	}
	
	draw()
	{
		for (let i = 0; i < this.rows; i++)
		{
			for (let j = 0; j < this.cols; j++)
			{
				this.cellList[i][j].draw();
			}
		}
	}	
};

// =================================================================== //

class Cell
{
	constructor(fieldObj, x, y, dx, dy)
	{
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.fieldObj = fieldObj;
		this.borderWidth = 1;
		this.backgroundColor = this.fieldObj.backgroundColor;
		this.borderColor = this.fieldObj.borderColor;
		this.owner = undefined;
	}
	
	draw()
	{
		let ctx = this.fieldObj.cnavasObj.getContext("2d");
		ctx.fillStyle = this.backgroundColor;
		ctx.strokeStyle = this.borderColor;
		ctx.lineWidth = this.borderWidth;
		//ctx.beginPath();
		//ctx.moveTo(x, y);
		ctx.fillRect(this.x, this.y, this.dx, this.dy);
		let shift = this.borderWidth / 2;
		ctx.strokeRect(this.x+shift, this.y+shift, this.dx-this.borderWidth, this.dy-this.borderWidth);
	}
	
	mouseover()
	{
		if (this.owner)
			return;
		this.borderWidth = 5;
		let player = GAME.currentPlayer();
		if (player)
			this.borderColor = player.color;
	}
	
	mouseout()
	{
		this.borderColor = this.fieldObj.borderColor;
		this.borderWidth = 1;
	}
	
	clicked()
	{
		let player = GAME.currentPlayer();
		if (player)
		{
			this.owner = player;
			this.backgroundColor = this.owner.color;
		}
	}
	
	clear()
	{
		this.owner = undefined;
		this.backgroundColor = this.fieldObj.backgroundColor;
	}
};
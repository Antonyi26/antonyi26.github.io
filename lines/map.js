function Map(cellSize, lines)
{
	this.lines = lines;
	this.objHtml = document.getElementById('map');
	this.objHtmlStyle = getComputedStyle(this.objHtml);
	
	//this.objHtml.style.left = x + 'px';
	//this.objHtml.style.top = y + 'px';
	this.objHtml.style.width = lines*cellSize + 'px';
	this.objHtml.style.height = lines*cellSize + 'px';
	
	this.cellList = [];
	
	// рисуем ячейки
	for (var i = 0; i < this.lines; i++)
	{
		var list = [];
		for (var j = 0; j < this.lines; j++)
		{
			var _cell = new Cell(i, j, cellSize);
			_cell.setPosition(j*cellSize, i*cellSize);
			//_cell.getHtmlElem().onclick = 
			list.push(_cell);
			this.objHtml.appendChild(_cell.getHtmlElem());				
		}
		this.cellList.push(list);
	};
	// -----------------------------------------------------
	// список id пустых ячеек
	this.getIdEmptyCells = function()
	{
		var list = [];
		
		for (var i = 0; i < this.lines; i++)
		{
			for (var j = 0; j < this.lines; j++)
			{
				if (this.cellList[i][j].hasChild())
					continue;
				list.push(this.cellList[i][j].getId());
			}
		}
		
		return list;
	};
	// -----------------------------------------------------
	this.cell = function()
	{
		var obj = null;
		
		if (arguments.length > 1)
		{
			var i = parseInt(arguments[0]);
			var j = parseInt(arguments[1]);
			obj = this.cellList[i][j];
		}
		else
		{
			var id = arguments[0];
			
			for (var i = 0; i < this.lines; i++)
			{
				for (var j = 0; j < this.lines; j++)
				{
					if (this.cellList[i][j].getId() == id)
					{
						obj = this.cellList[i][j];
						break;
					}
				}
			}
		}
		
		return obj;
	}
	// -----------------------------------------------------
	this.getCellList = function()
	{
		return this.cellList;
	}
}
// =========================================================
function Cell(i, j, size)
{
	this.row = i;
	this.column = j;
	this.elem = document.createElement('div');
	this.elem.classList.add('cell');
	this.elem.id = 'cell_' + i + '_' + j;
	this.elem.style.width = size + 'px';
	this.elem.style.height = size + 'px';
	// -----------------------------------------------------
	this.setPosition = function(x, y)
	{
		this.elem.style.left = x + 'px';
		this.elem.style.top = y + 'px';
	};
	// -----------------------------------------------------
	this.getHtmlElem = function()
	{
		return this.elem;
	};
	// -----------------------------------------------------
	this.hasChild = function()
	{
		return this.elem.hasChildNodes();
	};
	// -----------------------------------------------------
	this.getId = function()
	{
		return this.elem.id;
	};
}
// =========================================================
function Ball()
{
	this.color = ['red', 'green', 'blue', 'black', 'orange'];
	this.elem = document.createElement('div');
	this.elem.classList.add('ball');
	this.elem.style.backgroundColor = this.color[randomInteger(0, this.color.length-1)];
	//this.elem.style.backgroundColor = this.color[0];
	// -----------------------------------------------------
	this.getHtmlElem = function()
	{
		return this.elem;
	};
}
// =========================================================
function randomInteger(min, max)
{
	var rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
}
// =========================================================
var CELL_STEP = 80;
var LINES = 9;
var CNT_NEW_BALLS = 3;

//var MAP = new Map(40, 40, CELL_STEP, LINES);
var MAP = new Map(CELL_STEP, LINES);

var GOOD_LEN = 5;
var LAST_CELL = null;

function init()
{
	// назначаем обработчик события мыши для ячеек карты
	var cellList = MAP.getCellList();
	
	for (var i = 0; i < cellList.length; i++)
	{
		for (var j = 0; j < cellList[i].length; j++)
			cellList[i][j].getHtmlElem().onmousedown = movingBall;
	}
	// размещаем три шарика в произвольных местах поля
	drawNewBalls(5);
}
// ----------------------------------------------------
function drawNewBalls(n)
{
	var emptyCells = MAP.getIdEmptyCells();
	
	if (n >= emptyCells.length)
		n = emptyCells.length;
	
	for (var i = 0; i < n; i++)
	{
		var ind = randomInteger(0, emptyCells.length-1);
		var id = emptyCells[ind];
		emptyCells.splice(ind, 1);
		
		var _ball = new Ball();
		MAP.cell(id).getHtmlElem().appendChild( _ball.getHtmlElem() );
		// проверяем линии
		var line = checkLine( MAP.cell(id).getHtmlElem() );
		
		if (line.length >= GOOD_LEN)
			removeLine(line);
	}
	
	emptyCells = MAP.getIdEmptyCells();
	
	if (!emptyCells.length)
		alert("Игра окончена.");
}
// ----------------------------------------------------
function movingBall()
{
	if (!LAST_CELL)
	{
		if (this.hasChildNodes())
		{
			this.firstChild.style.animationName = 'pulse';
			LAST_CELL = this;
		}
	}
	else
	{
		LAST_CELL.firstChild.style.animationName = '';
		
		if (!this.hasChildNodes())
		{
			// перемещаем шарик
			var node = LAST_CELL.firstChild;
			LAST_CELL.removeChild(node);
			this.appendChild(node);
			// проверяем линии
			var line = checkLine(this);
			
			if (line.length < GOOD_LEN)
				drawNewBalls(CNT_NEW_BALLS);
			else
				removeLine(line);
		}
		LAST_CELL = null;
	}	
}
// ----------------------------------------------------
function checkLine(cellHtmlObj)
{
	var thisBallColor = getComputedStyle(cellHtmlObj.firstChild).backgroundColor;
	var ind_i = MAP.cell( cellHtmlObj.id ).row;
	var ind_j = MAP.cell( cellHtmlObj.id ).column;
	// проверяем во всех направлениях
	var vertical = [MAP.cell( cellHtmlObj.id )];
	var horizontal = [MAP.cell( cellHtmlObj.id )];
	var diag = [MAP.cell( cellHtmlObj.id )];
	var backDiag = [MAP.cell( cellHtmlObj.id )];
	
	// по вертикали ---------------------------------
	for (var i = +ind_i + 1; i < LINES; i++)
	{
		var currentCell = MAP.cell(i, ind_j);
		if ( !currentCell.hasChild() )
			break;
		var ballColor = getComputedStyle( currentCell.getHtmlElem().firstChild ).backgroundColor; 
		if (ballColor != thisBallColor)
			break;
		vertical.push( currentCell );
	}
	
	for (var i = ind_i - 1; i >= 0; i--)
	{
		var currentCell = MAP.cell(i, ind_j);
		if ( !currentCell.hasChild() )
			break;
		var ballColor = getComputedStyle( currentCell.getHtmlElem().firstChild ).backgroundColor; 
		if (ballColor != thisBallColor)
			break;
		vertical.push( currentCell );
	}
	// ---------------------------------------------
	// по горизонтали ------------------------------
	for (var j = +ind_j + 1; j < LINES; j++)
	{
		var currentCell = MAP.cell(ind_i, j);
		if ( !currentCell.hasChild() )
			break;
		var ballColor = getComputedStyle( currentCell.getHtmlElem().firstChild ).backgroundColor; 
		if (ballColor != thisBallColor)
			break;
		horizontal.push( currentCell );
	}
	
	for (var j = ind_j - 1; j >= 0; j--)
	{
		var currentCell = MAP.cell(ind_i, j);
		if ( !currentCell.hasChild() )
			break;
		var ballColor = getComputedStyle( currentCell.getHtmlElem().firstChild ).backgroundColor; 
		if (ballColor != thisBallColor)
			break;
		horizontal.push( currentCell );
	}
	// ---------------------------------------------
	// по диагонали --------------------------------
	for (var i = +ind_i + 1, j = +ind_j + 1; i < LINES && j < LINES; i++, j++)
	{
		var currentCell = MAP.cell(i, j);
		if ( !currentCell.hasChild() )
			break;
		var ballColor = getComputedStyle( currentCell.getHtmlElem().firstChild ).backgroundColor; 
		if (ballColor != thisBallColor)
			break;
		diag.push( currentCell );
	}
	
	for (var i = ind_i - 1, j = ind_j - 1; i >= 0 && j >= 0; i--, j--)
	{
		var currentCell = MAP.cell(i, j);
		if ( !currentCell.hasChild() )
			break;
		var ballColor = getComputedStyle( currentCell.getHtmlElem().firstChild ).backgroundColor; 
		if (ballColor != thisBallColor)
			break;
		diag.push( currentCell );
	}
	// ---------------------------------------------
	// по диагонали (обратной) ---------------------
	for (var i = +ind_i + 1, j = +ind_j - 1; i < LINES && j >= 0; i++, j--)
	{
		var currentCell = MAP.cell(i, j);
		if ( !currentCell.hasChild() )
			break;
		var ballColor = getComputedStyle( currentCell.getHtmlElem().firstChild ).backgroundColor; 
		if (ballColor != thisBallColor)
			break;
		backDiag.push( currentCell );
	}
	
	for (var i = +ind_i - 1, j = +ind_j + 1; i >= 0 && j < LINES; i--, j++)
	{
		var currentCell = MAP.cell(i, j);
		if ( !currentCell.hasChild() )
			break;
		var ballColor = getComputedStyle( currentCell.getHtmlElem().firstChild ).backgroundColor; 
		if (ballColor != thisBallColor)
			break;
		backDiag.push( currentCell );
	}
	// ---------------------------------------------
	var maxLen = Math.max( vertical.length, horizontal.length, diag.length, backDiag.length );
	if (maxLen == vertical.length) return vertical;
	if (maxLen == horizontal.length) return horizontal;
	if (maxLen == diag.length) return diag;
	if (maxLen == backDiag.length) return backDiag;
}
// ----------------------------------------------------
function removeLine(line)
{
	// ставим анимацию
	for (var i = 0; i < line.length; i++)
		line[i].getHtmlElem().firstChild.style.animationName = 'lost';
	
	// ждём некоторое время
	setTimeout(removeLine_end, 450, line);
}
// ----------------------------------------------------
function removeLine_end(line)
{
	// убираем анимацию
	for (var i = 0; i < line.length; i++)
		line[i].getHtmlElem().firstChild.style.animationName = '';
	
	// удаляем элементы
	for (var i = 0; i < line.length; i++)
		line[i].getHtmlElem().removeChild( line[i].getHtmlElem().firstChild );
	
	// увеличиваем счёт
	incScoreCnt(line.length);
}
// ----------------------------------------------------
function incScoreCnt(num)
{
	var cnt_score = document.getElementById('cnt_score');
	cnt_score.innerHTML = parseInt(cnt_score.innerHTML) + num;
}
// ----------------------------------------------------
function randomInteger(min, max)
{
	var rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
}
// ----------------------------------------------------
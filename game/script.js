
//var ROWS = 25;
//var COLS = ROWS;
var GAME;

window.onload = function(event)
{
	GAME = new Game();
	window.onresize = resizeHandler;
	GAME.MAP.cnavasObj.onmousemove = mouseHandler.bind(GAME.MAP);
	GAME.MAP.cnavasObj.onmousedown = mouseHandler.bind(GAME.MAP);
	GAME.MAP.cnavasObj.onmouseup = mouseHandler.bind(GAME.MAP);
	GAME.MAP.cnavasObj.onmouseout = mouseHandler.bind(GAME.MAP);
	GAME.MAP.cnavasObj.onmouseover = mouseHandler.bind(GAME.MAP);
	
    // кнопка "Добавить игрока"
	document.getElementById("player-add").onmousedown = function()
	{
		if (GAME.players.length < 4)
		{
			let name = document.getElementById("player-name").value;
			if (name)
			{
				let color = document.getElementById("player-color-select").value;
				let player = new Player(name, color);
				GAME.addPlayer(player);
				let id = GAME.players.length;
				player = document.getElementById("player_" + id);
				player.style.color = color;
				player.innerHTML = name;
                let score = document.getElementById("player_" + id + "_score");
 				score.style.color = color;
				score.innerHTML = "0";               
			}
		}
		else
		{
			alert("Максимальное количесвто игроков - 4.")
		}
		document.getElementById("player-name").value = "";
	};
	
	// кнопка "Новая игра"
	document.getElementById("new-game").onmousedown = function()
	{
		GAME.newGame();
	};
	
    // кнопка "Бросить кубик"
	document.getElementById("cubic-btn").onmousedown = function()
	{
        GAME.next();
        
        let el = document.getElementById("cubic-first-num");
        el.style.color = GAME.currentPlayer().color;
        el.innerHTML = randInt(1, 6);
        
        el = document.getElementById("cubic-second-num");
        el.style.color = GAME.currentPlayer().color;
        el.innerHTML = randInt(1, 6);
        
        el = document.getElementById("current-player");
        el.style.color = GAME.currentPlayer().color;
        el.innerHTML = GAME.currentPlayer().name;
	};    
	
	window.onresize();
};

function resizeHandler()
{
	let wrapper = document.getElementById("wrapper");
	let wrapperStyle = getComputedStyle(wrapper);
	let size = parseFloat( wrapperStyle.height );
    GAME.updateInfo();
	GAME.MAP.resize(size, size);
};



function mouseHandler(event)
{		
	if (event.type == "mousedown")
		this.mouse.isdown = true;
	else if (event.type == "mouseup" || event.type == "mouseout")
		this.mouse.isdown = false;
	//else if (event.type == "mouseover")
	//	this.mouse.isoverTrigger = true;
	//else if (event.type == "mouseout")
	//	this.mouse.isoutTrigger = true;
	let point = mousePoint2cellIndex.bind(this)(event);
	if (this.rows > point.i && point.i >= 0 && this.cols > point.j && point.j >= 0)
	{
		if (this.mouse.isdown)
		{
			if (event.ctrlKey)
				this.cellList[point.i][point.j].clear();
			else
				this.cellList[point.i][point.j].clicked();
		}

		//console.log("i: " + point.i + " " + "j: " + point.j);
		if ((this.rows > this.mouse.lastPoint.i && this.mouse.lastPoint.i >= 0
				&& this.cols > this.mouse.lastPoint.j && this.mouse.lastPoint.j >= 0)
				&& (this.mouse.lastPoint.i != point.i || this.mouse.lastPoint.j != point.j))
		{
			this.cellList[this.mouse.lastPoint.i][this.mouse.lastPoint.j].mouseout();
			this.cellList[point.i][point.j].mouseover();
		}

		this.mouse.lastPoint = point;
		
		window.onresize();		
	}
};

function mousePoint2cellIndex(event)
{
	let canvasX = this.cnavasObj.offsetLeft;
	let canvasY = this.cnavasObj.offsetTop;
	let x = event.clientX - canvasX;
	let y = event.clientY - canvasY;
	let dx = this.width / this.cols;
	let dy = this.height / this.rows;
	let ij = {
		i: Math.floor(y / dy),
		j: Math.floor(x / dx)
	};	
	return ij;
};

function randInt(min, max) 
{
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

/* function drawMap()
{
	let map = document.getElementById("map");
	let ctx = map.getContext("2d");
	let dx = map.width / COLS;
	let dy = map.height / ROWS;
	ctx.strokeStyle = "#bbbbbb";
	
	for (let i = 0; i < COLS; i++)
	{
		ctx.beginPath();
		let x = i * dx;
		ctx.moveTo(x, 0);
		ctx.lineTo(x, map.height);
		ctx.stroke();
	}
	
	for (let i = 0; i < ROWS; i++)
	{
		ctx.beginPath();
		let y = i * dy;
		ctx.moveTo(0, y);
		ctx.lineTo(map.width, y);
		ctx.stroke();
	}
} */
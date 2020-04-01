var STEP = 20;
// параметры еды
var FOOD = document.getElementsByClassName('food');
//var FOOD_STYLE = getComputedStyle(FOOD);
// параметры змейки
var SNAKE = document.getElementById('snake');
var HEAD = document.getElementById('head');
var HEAD_STYLE = getComputedStyle(HEAD);
var DIRECTION = 'right';
var OLD_DIRECTION = 'right';
// параметры игрового поля
var MAP = document.getElementById('map');
var MAP_STYLE = getComputedStyle(MAP);
// граничные условия
var LIM_TOP = 0;
var LIM_RIGHT = parseInt(MAP_STYLE.width);
var LIM_BOTTOM = parseInt(MAP_STYLE.height);
var LIM_LEFT = 0;
// ----
// --------------------------------------------------------------
window.onload = function()
{
	var snake = SNAKE.children;
	var startPos = {
		top: STEP,
		left: STEP
	};
	
	for (var i = snake.length - 1; i >= 0; i--)
	{
		snake[i].style.height = STEP + 'px';
		snake[i].style.width = STEP + 'px';
		//snake[i].style.borderRadius = Math.floor(STEP / 3) + 'px';
		snake[i].style.top = startPos.top + 'px';
		snake[i].style.left = startPos.left + 'px';
		
		startPos.left += STEP;
	}
	
	makeFood();
}
// --------------------------------------------------------------
function move()
{	
	var snake = SNAKE.children;
	
	// двигаем тело без головы
	for (var i = snake.length - 1; i > 0; i--)
	{
		snakeStyle = getComputedStyle(snake[i-1]);
		snake[i].style.top = snakeStyle.top;
		snake[i].style.left = snakeStyle.left;
		snake[i].style.backgroundColor = '';
		//snake[i].classList.add("snk");
	}

	// двигаем голову
	var elStyle = getComputedStyle(HEAD); 
	var pos = {
		top: parseInt(elStyle.top),
		left: parseInt(elStyle.left)
	};
	
	// проверяем условия
	var cond_1 = OLD_DIRECTION == 'left' && DIRECTION == 'right';
	var cond_2 = OLD_DIRECTION == 'right' && DIRECTION == 'left';
	var cond_3 = OLD_DIRECTION == 'up' && DIRECTION == 'down';
	var cond_4 = OLD_DIRECTION == 'down' && DIRECTION == 'up';
	
	if ( cond_1 || cond_2 || cond_3 || cond_4 )
		DIRECTION = OLD_DIRECTION;
	
	
	switch( DIRECTION )
	{
		case 'down':
			pos.top += STEP;
			if (pos.top >= LIM_BOTTOM) pos.top = LIM_TOP;
			break;
		case 'left':
			pos.left -= STEP;
			if (pos.left < LIM_LEFT) pos.left = LIM_RIGHT - STEP;
			break;
		case 'up':
			pos.top -= STEP;
			if (pos.top < LIM_TOP) pos.top = LIM_BOTTOM - STEP;
			break;
		case 'right':
			pos.left += STEP;
			if (pos.left >= LIM_RIGHT) pos.left = LIM_LEFT;
			break;		
	}
	
	OLD_DIRECTION = DIRECTION;
	
	HEAD.style.top = pos.top + 'px';
	HEAD.style.left = pos.left + 'px';
	
	// проверяем еду
	var objFood = headOnFood();
	if ( objFood )
	{
		clearFood(objFood);
		addSnakeLen();
		drawNewPosFood(objFood);
		incScoreCnt();
	}
	// проверяем поедание хвоста
	if ( headOnTail() )
	{
		clearInterval(TIMER); 
		alert('Конец игры.');
	}
	
}
// --------------------------------------------------------------
window.onkeydown = function( e )
{	
	e = e || window.event;
	
	switch( e.keyCode )
	{
		case 37: DIRECTION = "left"; break;	// влево
		case 38: DIRECTION = "up"; break;	// вверх
		case 39: DIRECTION = "right"; break;	// вправо
		case 40: DIRECTION = "down"; break;	// вниз
	}

}
// --------------------------------------------------------------
function makeFood()
{
	for (var i = 0; i < FOOD.length; i++)
	{
		FOOD[i].style.height = STEP + 'px';
		FOOD[i].style.width = STEP + 'px';
	}
	
	drawNewPosFood();
}
// --------------------------------------------------------------
function clearFood(objFood)
{
	objFood.style.backgroundColor = '';
}
// --------------------------------------------------------------
function drawNewPosFood(objFood)
{
	if (objFood !== undefined)
	{
		var val = randomInteger(0, parseInt(MAP_STYLE.height) - STEP);
		objFood.style.top = Math.round(val / STEP) * STEP + 'px';
		
		val = randomInteger(0, parseInt(MAP_STYLE.width) - STEP);
		objFood.style.left = Math.round(val / STEP) * STEP + 'px';
		
		objFood.style.backgroundColor = 'lime';
		
		return;
	}
	
	for (var i = 0; i < FOOD.length; i++)
	{
		var val = randomInteger(0, parseInt(MAP_STYLE.height) - STEP);
		FOOD[i].style.top = Math.round(val / STEP) * STEP + 'px';
		val = randomInteger(0, parseInt(MAP_STYLE.width) - STEP);
		FOOD[i].style.left = Math.round(val / STEP) * STEP + 'px';
		
		FOOD[i].style.backgroundColor = 'lime';
	}
}
// --------------------------------------------------------------
function headOnFood()
{
	var objFood = null;
	
	for (var i = 0; i < FOOD.length; i++)
	{	
		var FOOD_STYLE = getComputedStyle(FOOD[i]);
		
		if (HEAD_STYLE.top == FOOD_STYLE.top)
		{
			if (HEAD_STYLE.left == FOOD_STYLE.left)
			{
				objFood = FOOD[i];
				break;
			}
		}
	}
	
	return objFood;
}
// --------------------------------------------------------------
function headOnTail()
{
	var snake = SNAKE.children;
	
	for (var i = snake.length - 1; i > 0; i--)
	{
		if (snake[i].style.top == HEAD_STYLE.top)
		{
			if (snake[i].style.left == HEAD_STYLE.left)
				return true;
		}
	}
	
	return false;
}
// --------------------------------------------------------------
function addSnakeLen()
{
	var tail = document.createElement('div');
	tail.classList.add("snk");
	
	tail.style.backgroundColor = MAP_STYLE.backgroundColor;
	tail.style.height = STEP + 'px';
	tail.style.width = STEP + 'px';
	
	
	SNAKE.appendChild(tail);
}
// --------------------------------------------------------------
function randomInteger(min, max) 
{
	var rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
}
// --------------------------------------------------------------
function incScoreCnt()
{
	score_cnt.innerHTML = parseInt(score_cnt.innerHTML) + 1;
}
// --------------------------------------------------------------
var TIMER = setInterval(move, 1000/10);
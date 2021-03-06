// Game class, Player class

class Game
{
	constructor()
	{
		this.MAP = new Field(document.getElementById("map"), 25, 25, "#ffffff");
		this.players = [];
		this.token = 0;
	}
	
	newGame()
	{
		for (let i = 0; i < this.players.length; i++)
			this.players[i].score = 0;
		// очищаем поле
		this.MAP.clear();
        this.updateInfo();
        this.MAP.resize();
	}
	
	addPlayer(player)
	{
		this.players.push(player);
	}
	
	currentPlayer()
	{
		return this.players[this.token];
	}
	
	next()
	{
		this.token++;
		this.token = this.token % this.players.length;
	}
    
    updateInfo()
    {
        for (let i = 0; i < this.players.length; i++)
        {
            let el = document.getElementById("player_" + (+i + 1) + "_score");
            el.innerHTML = this.players[i].score;
        }
    }
};

class Player
{
	constructor(name, color)
	{
		this.name = name;
		this.color = color;
		this.score = 0;
	}
    
    addScore(num)
    {
        this.score += num;
        if (this.score < 0)
            this.score = 0;
    }
};
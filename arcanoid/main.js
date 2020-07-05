const KEYS = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

class Canvas
{
  static center;
  static htmlObj;

  static init()
  {
    let container = document.querySelector(".container");
    let containerStyle = getComputedStyle(container);
    Canvas.htmlObj = document.querySelector("canvas");
    Canvas.width = parseInt(containerStyle.width);
    Canvas.height = parseInt(containerStyle.height);
    Canvas.center = {
      x: Canvas.width / 2,
      y: Canvas.height / 2,
    };
  }

  static get context() {return Canvas.htmlObj.getContext("2d");}
  static set width(w) {Canvas.htmlObj.width = parseInt(w);}
  static get width() {return Canvas.htmlObj.width;}
  static set height(h) {Canvas.htmlObj.height = parseInt(h);}
  static get height() {return Canvas.htmlObj.height;}
  static clear() {Canvas.width = Canvas.width;}
}



class Game
{
  static platform;
  static ball;
  static bricks;

  static init()
  {
    Canvas.init();

    Game.platform = new Rect({
      x: Canvas.center.x,
      y: Canvas.height * 0.8,
      width: 100,
      height: 20,
      color: "#ff000088",
      speedX: 5,
    });

    Game.ball = new Circle({
      centerX: Canvas.center.x,
      centerY: Canvas.center.y,
      radius: 10,
      color: "#0000ff88",
      speedX: 2,
      speedY: 3,
    });
    Game.ball.dx = Game.ball.speedX;
    Game.ball.dy = Game.ball.speedY;

    Game.setEvents();
  }

  static setEvents()
  {
    window.focus();

    window.addEventListener("keydown", (e) => {
      switch (e.keyCode)
      {
        case KEYS.LEFT:
          Game.platform.dx = -Game.platform.speedX;
          break;
        case KEYS.RIGHT:
          Game.platform.dx = Game.platform.speedX;
          break;          
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.keyCode)
      {
        case KEYS.LEFT:
        case KEYS.RIGHT:
          Game.platform.dx = 0;
          break;      
      }
    });
  }

  static update()
  {
    Game.platform.update();
    Game.ball.update();

    if (Game.ball.isCollision(Game.platform))
    {
      //console.log("collision!!!");
      if (!Game.ball.collided)
      {
        Game.ball.collided = true;
        Game.ball.dy = -Game.ball.dy;
        let k = Game.ball.dx * Game.platform.dx < 0 ? 2 : 4;
        Game.ball.dx += Game.platform.dx / k;
      }
    }
    else
    {
      Game.ball.collided = false;
    }
  }

  static render()
  {
    Canvas.clear();
    Game.platform.draw();
    Game.ball.draw();
  }

  static run()
  {
    window.requestAnimationFrame(() => {
      Game.update();
      Game.render();
      Game.run();
    });
  }

  static start()
  {
    Game.init();
    Game.run();
  }
};



window.addEventListener("load", () => {
  Game.start();
});
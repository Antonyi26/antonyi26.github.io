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
      y: Canvas.center.y,
      width: 100,
      height: 20,
      color: "#ff000088",
    });

    Game.ball = new Circle({
      centerX: Canvas.center.x,
      centerY: Canvas.center.y,
      radius: 20,
      color: "#0000ff88",
      speed: 2,
    });

    Game.setEvents();
  }

  static setEvents()
  {
    Canvas.htmlObj.addEventListener("mousemove", (e) => {
      Game.platform.dx = e.clientX;
      Game.platform.dy = e.clientY;
    });
  }

  static update()
  {
    Game.platform.update();
    Game.ball.update();
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
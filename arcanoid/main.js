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
    Game.platform = new Rect(
      Canvas.center.x,
      Canvas.center.y,
      100,
      20,
      "#ff000088"
    );
    Game.ball = new Circle(
      Canvas.center.x,
      Canvas.center.y,
      100,
      "#00ff0088"
    );
  }

  static start()
  {
    Game.init();
    Game.platform.draw();
    Game.ball.draw();
  }
};



window.addEventListener("load", () => {
  Game.start();
});
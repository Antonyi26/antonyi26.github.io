class Shape
{
  x; y;
  width;
  height;
  color;
  filled;

  constructor(shapeObj)
  {
    shapeObj = Object.assign({
      color: "black",
      filled: true,
    }, shapeObj);

    this.x = shapeObj.x;
    this.y = shapeObj.y;
    this.width = shapeObj.width;
    this.height = shapeObj.height;
    this.color = shapeObj.color;
    this.filled = shapeObj.filled;
  }

  get centr()
  {
    return {
      x: this.x + this.width/2, 
      y: this.y + this.height/2
    };
  }

  draw()
  {
    let ctx = Canvas.context;
    let offset = 5;
    ctx.strokeStyle = "yellow";
    ctx.strokeRect(
      this.x - offset, 
      this.y - offset, 
      this.width + offset * 2, 
      this.height + offset * 2
    );
  }

  isCollision(shapeObj)
  {
    let top = this.y <= shapeObj.y + shapeObj.height;
    let right = this.x + this.width >= shapeObj.x;
    let bottom = this.y + this.height >= shapeObj.y;
    let left = this.x <= shapeObj.x + shapeObj.width;
    return top && right && bottom && left;
  }
};

// ================================================ //

class MovedShape extends Shape
{
  dx; dy;
  speedX;
  speedY;

  constructor(shapeObj)
  {
    shapeObj = Object.assign({
      speedX: 0,
      speedY: 0,
    }, shapeObj);

    super(shapeObj);
    this.speedX = shapeObj.speedX;
    this.speedY = shapeObj.speedY;
    this.dx = 0;
    this.dy = 0;
  }

  update() 
  {
    this.x += this.dx;
    this.y += this.dy;
  }
};

// ================================================ //

class Rect extends MovedShape
{
  constructor(rectObj)
  {
    super(rectObj);
  }

  draw()
  {
    //super.draw();
    let ctx = Canvas.context;
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    
    if (this.filled)
    {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    else
    {
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }

  update()
  {
    super.update();

    if (this.x > Canvas.width - this.width)
    {
      this.x = Canvas.width - this.width;
      this.dx = 0;
    }
    else if (this.x < 0)
    {
      this.x = 0;
      this.dx = 0;
    }
  }
};

// ================================================ //

class Circle extends MovedShape
{
  radius;
  collided;

  constructor(circleObj)
  {
    let shapeObj = Object.assign({
      x: circleObj.centerX - circleObj.radius,
      y: circleObj.centerY - circleObj.radius,
      width: circleObj.radius * 2,
      height: circleObj.radius * 2,
    }, circleObj);
    super(shapeObj);
    this.radius = circleObj.radius;
    this.collided = false;
  }

  update()
  {
    super.update();

    if (this.x > Canvas.width - this.width || this.x < 0)
    {
      this.dx = -this.dx;
    }
    if (this.y > Canvas.height - this.height || this.y < 0)
    {
      this.dy = -this.dy;
    }
  }

  draw()
  {
    //super.draw();
    let ctx = Canvas.context;
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.x + this.radius, 
      this.y + this.radius, 
      this.radius, 
      0, Math.PI * 2, 
      false
    );
    
    if (this.filled)
    {
      ctx.fill();
    }
    else
    {
      ctx.stroke();
    }
  }
};
class Shape
{
  topLeftPoint;
  width;
  height;
  color;
  filled;

  constructor(x, y, width, height, color)
  {
    this.topLeftPoint = {
      x: x,
      y: y,
    };
    this.width = width;
    this.height = height;
    this.color = color;
    this.filled = false;
  }

  draw()
  {
    let ctx = Canvas.context;
    let offset = 5;
    ctx.strokeStyle = "yellow";
    ctx.strokeRect(
      this.topLeftPoint.x - offset, 
      this.topLeftPoint.y - offset, 
      this.width + offset * 2, 
      this.height + offset * 2
    );
  }
};


class Rect extends Shape
{
  constructor(x, y, width, height, color)
  {
    super(x, y, width, height, color);
  }

  draw()
  {
    //super.draw();
    let ctx = Canvas.context;
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    
    if (this.filled)
    {
      ctx.fillRect(this.topLeftPoint.x, this.topLeftPoint.y, this.width, this.height);
    }
    else
    {
      ctx.strokeRect(this.topLeftPoint.x, this.topLeftPoint.y, this.width, this.height);
    }
  }
};

class Circle extends Shape
{
  center;
  radius;

  constructor(centerX, centerY, radius, color)
  {
    let len = radius * 2;
    super(centerX - radius, centerY - radius, len, len, color);
    this.center = {
      x: centerX,
      y: centerY,
    };
    this.radius = radius;
  }

  draw()
  {
    //super.draw();
    let ctx = Canvas.context;
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.center.x, 
      this.center.y, 
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
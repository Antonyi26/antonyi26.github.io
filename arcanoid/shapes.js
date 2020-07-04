class Shape
{
  x; y;
  width;
  height;
  color;
  filled;

  constructor(x, y, width, height, color)
  {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.filled = false;
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

  update()
  {
    
  }
};

// ================================================ //

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
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    else
    {
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
};

// ================================================ //

class Circle extends Shape
{
  radius;

  constructor(centerX, centerY, radius, color)
  {
    let len = radius * 2;
    super(centerX - radius, centerY - radius, len, len, color);
    this.radius = radius;
  }

  update()
  {
    //this.x += 0.2;
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
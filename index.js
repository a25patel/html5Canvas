//randomize color of things already drawn
// randomly generate squares and circles
// erase all items

// Draw my canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//set blank array
var array = [];

//on mouseClick draw a square or circle depending on what the user has chosen
function mouseClick(){
  canvas.addEventListener('mousedown', function(event){
    var shape = document.getElementById('shape').value;
    var widthNumber = document.getElementById('widthNumber').value;
    var hexCode = document.getElementById('hexCode').value;

    if(shape === 'square'){
      var square = new Square(event.pageX, event.pageY, widthNumber, hexCode );
      square.draw();
      array.push(square);
    } else if(shape === 'circle'){
      var circle = new Circle(event.pageX, event.pageY, widthNumber, hexCode);
      circle.draw();
      array.push(circle);
    }
  });
};

//randomize the colors
var randomColor = document.getElementById('randomize');
randomColor.addEventListener('click', function(){
  if(array.length> 0 ){
    ctx.clearRect(0,0,500,500);
    for(var i =0; i < array.length; i++ ){
      var randomHex = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
      array[i].color = randomHex;
      array[i].  draw();
    }
  }else{
    alert('Make some shapes');
  }
});

//clear the board - aka draw a blank rectangle over the entire canvas
var clear = document.getElementById('clear');
clear.addEventListener('click', function(){
  ctx.clearRect(0,0,500,500);
});

//randomly generate squares and circles
var randomGen = document.getElementById('randomGen');
randomGen.addEventListener('click', function(){
  for(var i =0; i<100; i++){
    var randomHex = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    var randomWidth = Math.floor(Math.random() * 150);
    var randomX = Math.floor(Math.random() * 750);
    var randomY = Math.floor(Math.random() * 500);
    if(i%2 != 0){
      var square = new Square(randomX, randomY, randomWidth, randomHex);
      square.draw();
    }else{
      var circle = new Circle(randomX, randomY, randomWidth, randomHex);
      circle.draw();
    }
  }
});


function Shape(x,y,width,color){
  this.x = x;
  this.y = y;
  this.width = width;
  this.color = color;
};

function Square(x,y,width,color){
  Shape.call(this, x,y,width,color);
}

function Circle(x,y,width,color){
  Shape.call(this,x,y,width,color);
  this.start = 0;
  this.end = (Math.PI)*2;
  this.clock = true;
}

Square.prototype.draw = function (){
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.width);
};

Circle.prototype.draw = function (){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.width, this.start, this.end, this.clock);
  ctx.closePath();
  ctx.fill();
};

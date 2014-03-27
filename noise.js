var Canvas = require('canvas'), fs = require('fs'), _ = require('underscore'), Faker = require('Faker');

module.exports = function(opts) {
  var width = opts['width'];
  var height = opts['height'];
  var squareWidth = opts['squareWidth'];
  var squareHeight = opts['squareHeight'];
  
  var canvas = new Canvas(width, height);
  var ctx = canvas.getContext('2d');
  
  _.times((width / squareWidth), function(x) {
    _.times((height / squareHeight), function(y) {
      var c = _.shuffle([ Math.ceil((Math.random() * 255)), Math.ceil((Math.random() * 255)), Math.ceil((Math.random() * 255)) ]);
      ctx.fillStyle = "rgb("+c.join(",")+")";
      ctx.fillRect(squareWidth*x, squareHeight*y, squareWidth, squareHeight);
    })    
  })
  
  var fontSize = ((height / 10) > 500 ? 500 : (height / 10));
  ctx.font = fontSize+"px ProximaNova bold";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.shadowColor = "#333";
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 10;
  ctx.fillText(Faker.random.bs_adjective(), (width / 2), (height / 2)-fontSize);
  ctx.fillText(Faker.random.bs_buzz(), (width / 2), (height / 2));
  ctx.fillText(Faker.random.bs_noun(), (width / 2), (height / 2)+fontSize);
  
  return canvas.createJPEGStream(100);
  
};
var express = require('express'), app = express();
app.configure(function() {
  app.use(express.logger());
});

var noise = require('./noise');
app.get("/:noise", function (req, res) {
  var sizes = {
    "16k": { width: 500, height: 500, squareWidth: 100, squareHeight: 100 },
    "60k": { width: 1000, height: 1000, squareWidth: 100, squareHeight: 100 },
    "200k": { width: 2000, height: 2000, squareWidth: 100, squareHeight: 100 },
    "750k": { width: 3000, height: 3000, squareWidth: 50, squareHeight: 50 },
    "1.4m": { width: 3000, height: 3000, squareWidth: 25, squareHeight: 25 },
    "2.5m": { width: 3000, height: 3000, squareWidth: 10, squareHeight: 10 },
    "7m": { width: 4000, height: 4000, squareWidth: 5, squareHeight: 5 }
  };
  
  res.set({ "Content-Type": "image/jpeg" });
  if (sizes[req.params.noise]) {
    noise(sizes[req.params.noise]).pipe(res)
  }
  
})

app.get(/.+/, function (req, res) {
  res.send(404);
});

var http = require('http'), server = http.createServer(app);
http.globalAgent.maxSockets = 1000;
var port = process.env.PORT || 3001;
server.listen(port, function () {
  console.log("Listening on " + port);
});
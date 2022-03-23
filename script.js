var express = require("express");
var app = express();

app.use(express.static("."));

app.get("/", function (req, res) {
  res.redirect("final.html");
});
app.get("/name/:search", function (req, res) {
  var search = req.params.search;
  res.redirect("https://google.com/search?q=" + search);
});

app.listen(3000, function () {
  console.log("Example is running on port 3000");
});

io.on("connection", function (socket) {
  for (var i in messages) {
    socket.emit("display message", messages[i]);
  }
  socket.on("send message", function (data) {
    messages.push(data);
    io.sockets.emit("display message", data);
  });
});
function main() {
  var socket = io();
  var chatDiv = document.getElementById("chat");
  var input = document.getElementById("message");
  var button = document.getElementById("submit");

  function handleSubmit() {
    var val = input.value;
    if (val != "") {
      socket.emit("send message", val);
    }
  }
  button.onclick = handleSubmit;
  function handleMessage(msg) {
    var p = document.createElement("p");
    p.innerText = msg;
    chatDiv.appendChild(p);
    input.value = "";
  }

  socket.on("display message", handleMessage);
} // main closing bracket

window.onload = main;

var side = 10;
var matrix = [];
var n = 70;
var m = 70;

for (var Y = 0; Y < n; Y++) {
  matrix[Y] = [];
  for (var X = 0; X < m; X++) {
    var k = Math.floor(Math.random() * 100);
    if (k >= 0 && k < 30) {
      matrix[Y][X] = 1;
    } else if (k >= 30 && k < 50) {
      matrix[Y][X] = 2;
    } else if (k >= 50 && k < 60) {
      matrix[Y][X] = 3;
    } else if (k >= 60 && k < 70) {
      matrix[Y][X] = 4;
    } else if (k >= 70 && k < 100) {
      matrix[Y][X] = 0;
    }
  }
}

var grassArr = [];
var GrassEaterArr = [];
var PredatorArr = [];
var HunterArr = [];

function setup() {
  frameRate();
  createCanvas(matrix[0].length * side, matrix.length * side);
  background("gray");

  for (var y = 0; y < matrix.length; ++y) {
    for (var x = 0; x < matrix[y].length; ++x) {
      if (matrix[y][x] == 1) {
        var gr = new Grass(x, y);
        grassArr.push(gr);
      } else if (matrix[y][x] == 2) {
        var geat = new GrassEater(x, y);
        GrassEaterArr.push(geat);
      } else if (matrix[y][x] == 3) {
        var pr = new Predator(x, y);
        PredatorArr.push(pr);
      } else if (matrix[y][x] == 4) {
        var hn = new Hunter(x, y);
        HunterArr.push(hn);
      } else if (matrix[y][x] == 5) {
        var bad = new BadGrass(x, y);
        badgrassArr.push(bad);
      }
    }
  }
}

function draw() {
  for (var I = 0; I < matrix.length; I++) {
    for (var J = 0; J < matrix[I].length; J++) {
      if (matrix[I][J] == 1) {
        fill("green");
        rect(J * side, I * side, side, side);
      } else if (matrix[I][J] == 2) {
        fill("yellow");
        rect(J * side, I * side, side, side);
      } else if (matrix[I][J] == 3) {
        fill("red");
        rect(J * side, I * side, side, side);
      } else if (matrix[I][J] == 4) {
        fill("brown");
        rect(J * side, I * side, side, side);
      } else if (matrix[I][J] == 0) {
        fill("grey");
        rect(J * side, I * side, side, side);
      }
    }
  }

  for (var i in grassArr) {
    try {
      grassArr[i].mul();
    } catch (err) {
      continue;
    }
  }
  for (var i in GrassEaterArr) {
    try {
      GrassEaterArr[i].mul();
    } catch (err) {
      continue;
    }
    try {
      GrassEaterArr[i].eat();
    } catch (err) {
      continue;
    }
  }
  for (var i in PredatorArr) {
    try {
      PredatorArr[i].mul();
    } catch (err) {
      continue;
    }
    try {
      PredatorArr[i].eat();
    } catch (err) {
      continue;
    }
  }
  for (var i in HunterArr) {
    try {
      HunterArr[i].kill();
    } catch (err) {
      continue;
    }
  }
}

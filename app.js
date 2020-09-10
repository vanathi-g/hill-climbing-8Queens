const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

// Home route
app.get("/", function(req, res){
  res.render('index');
});

// Display solution
app.post("/solution", function(req, res){
  const boardConfig = req.body.queenArray;

  var spawn = require("child_process").spawn;
  var process = spawn('python3', ["./8queens.py", boardConfig]);

  process.stdout.on('data', function(data){
    const received = data.toString()
    const l = received.length;
    const steps = received.substring(0, l-2);
    const ofv = received.substring(l-2,l-1);
    res.render('solution', {solnSteps: steps, objFuncVal: ofv});
  });
});

// Any other route = 404
app.get('*', function(req, res){
  res.render('404-error');
});

// Running the server
app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000");
});

//Autonomous car demonstration.
//Sensors as input to Neural Network Brain.
// Thanks to Dan Shiffman for his Matrix.js class

//PRESS SPACEBAR TO RUN FASTER

//PRESS "L" TO LOAD PRE-TRAINIED MODEL



var t; // global for the loaded table
var popul;
var bestBrain;
//Player theplayer;
var up = false;
var left = false;
var right = false;
var down = false;
var lines = [];
var gates = [];
//ArrayList<Boolean> player_gate_intersection_oneshot;
var showSensors = true;
var showPlayers = true;
var track;
var tempWeight_ih =[];
var tempWeight_hh =[];
var tempWeight_ho =[];

//ga variables
var init_pop_size = 500;
var lowest_alive;
var allTimeHigh = 0;
var numInputNodes = 8;
var numHiddenNodes = 20;
var numOutputNodes = 4;
var globalMutationRate = 0.085;

var maxf = 0;
var maxIndex = 0;
var max_alive = 0;
var maxIndexAlive = 0;
var numAlive = 0;

function preload() {
    bestBrain = loadJSON('best_player.json');
    //loadJSON("best_player.json", bestBrain);
}

function setup() {
    createCanvas(2200, 1650);
    //theplayer = new Player(1650,1440);
    tempWeight_ih.data = bestBrain.weight_ih.data;
    tempWeight_hh.data = bestBrain.weight_hh.data;
    tempWeight_ho.data = bestBrain.weight_ho.data;
    popul = new Population(init_pop_size);
    track = new Track();
} //setup

function draw() {
    background(255);
    // draw the track
    //for (var line in lines) {
    //    line.show();
    //}
    for(var l = 0; l <= lines.length - 1;l++) {
        lines[l].show();
    }
    // draw the gates
    // for (var gate in gates) {
    //     gate.show();
    // }
    for(var g = 0; g <= gates.length - 1; g++) {
        gates[g].show();
    }
        // start the population actions
    if(!popul.done()) { 
        popul.updateAlive();
    } else {
        popul.calculateFitness();
        popul.naturalSelection();
    }
    showInfo();
} // draw

function keyPressed(){
    // if(keyCode == UP) {
    //     up = true;
    // }
    // if(keyCode == DOWN) {
    //     down = true;
    // }
    // if(keyCode == LEFT) {
    //     left = true;
    // }
    // if(keyCode == RIGHT) {
    //     right = true;
    // }
    if(key == ' ') {
        showSensors = !showSensors;
    }
    if(key == 'p') {
        showPlayers = !showPlayers;
    }
    if(key == 's') {
        popul.players[lowest_alive].savePlayer();
    }
    if(key == 'l') {
        popul.loadPlayer();
    }
    }
      
// function keyReleased() {
//     if (keyCode == UP) {
//         up = false;
//     }
//     if (keyCode == DOWN) {
//         down = false;
//     }
//     if (keyCode == RIGHT) {
//         right = false;
//     }
//     if (keyCode == LEFT) {
//         left = false;
//     }
// } // keyreleased
      
      
function showInfo() {
    fill(200);
    textAlign(LEFT);
    textSize(20);
    //text("score: " + max_alive,30,height - 100);
    //text("live index: " + maxIndexAlive,30,height - 125);
    text("Position: " + popul.players[lowest_alive].position.x + " : " + popul.players[lowest_alive].position.y,30,height-25);
    text("Score: " + popul.players[lowest_alive].score,30,height - 45);
    text("Gen: " + popul.gen, 30, height - 65);
    text("Left Alive: " + numAlive, 30, height - 85);
    text("vision1: " + popul.players[lowest_alive].vision[0],30,height - 240);
    text("vision2: " + popul.players[lowest_alive].vision[1],30,height - 220);
    text("vision3: " + popul.players[lowest_alive].vision[2],30,height - 200);
    text("vision4: " + popul.players[lowest_alive].vision[3],30,height - 180);
    text("vision5: " + popul.players[lowest_alive].vision[4],30,height - 160);
    text("vision6: " + popul.players[lowest_alive].vision[5],30,height - 140);
    text("vision7: " + popul.players[lowest_alive].vision[6],30,height - 120);
    text("vision8: " + popul.players[lowest_alive].vision[7],30,height - 100);
    //text("angle: " + theplayer.angle, 30,height - 120);
    //text("vertex 1: " + theplayer.p1x + ", " + theplayer.p1y, 30, height - 100);
    //text("vertex 2: " + theplayer.p2x + ", " + theplayer.p2y, 30, height - 75);
    //text("vertex 3: " + theplayer.p3x + ", " + theplayer.p3y, 30, height - 50);
    //text("vertex 4: " + theplayer.p4x + ", " + theplayer.p4y, 30, height - 25);
} // showInfo
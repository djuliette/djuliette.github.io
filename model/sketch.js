import * as tf from '@tensorflow/tfjs';

let model;

function setup() {
    createCanvas(400,400);
    
    model = await tf.loadLayersModel('./model.json');
    
}

function draw() {
    background(200);
}

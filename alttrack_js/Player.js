class Player {
    constructor(x_,y_) {
        this.position = new createVector(x_,y_);
        this.velocity = new createVector(0,0);
        this.acceleration = new createVector(0,0);
        this.p_length = 25;  // the length is the width and the width is the length, oops
        this.p_width = 50;
        this.rectDiag;
        this.rectAngle;
        this.speed = 0.5;
        this.speed_limit = 7;
        this.rotate_speed = 0.07;
        this.angle = -PI/2;

  //corners of the car in absolute coordinates
        this.p1x, this.p1y, this.p2x, this.p2y, this.p3x, this.p3y, this.p4x, this.p4y;
  // begin points of sensors in absolute coordinates
        this.s1x, this.s1y, this.s2x, this.s2y, this.s3x, this.s3y, this.s4x, this.s4y, this.s5x, this.s5y, this.s6x, this.s6y, this.s7x, this.s7y, this.s8x, this.s8y;
  // end points of sensors in absolute coordinates
        this.se1x, this.se1y, this.se2x, this.se2y, this.se3x, this.se3y, this.se4x, this.se4y;
        this.se5x, this.se5y, this.se6x, this.se6y, this.se7x, this.se7y, this.se8x, this.se8y;
  // cars intersect point
        this.i_point1, this.i_point2, this.i_point3, this.i_point4;
  //sensors
        this.sensor1, this.sensor2, this.sensor3, this.sensor4, this.sensor5, this.sensor6, this.sensor7, this.sensor8;
  //sensors intersect point
        this.s1Intersect, this.s2Intersect, this.s3Intersect, this.s4Intersect, this.s5Intersect, this.s6Intersect, this.s7Intersect, this.s8Intersect;

        this.isDead;

        this.player_gate_intersection = [];
        this.player_gate_intersection_oneshot = [];
  
  //crap, cant do this, need array
  //boolean player_gate_intersection_oneshot0 = false;
  //boolean player_gate_intersection_oneshot1 = false;
  //boolean player_gate_intersection_oneshot2 = false;
  //boolean player_gate_intersection_oneshot3 = false;
  //boolean player_gate_intersection_oneshot4 = false;
  //boolean player_gate_intersection_oneshot5 = false;
  //boolean player_gate_intersection_oneshot6 = false;
  //boolean player_gate_intersection_oneshot7 = false;
  //boolean player_gate_intersection_oneshot8 = false;
  //boolean player_gate_intersection_oneshot9 = false;
  //boolean player_gate_intersection_oneshot10 = false;
  //boolean player_gate_intersection_oneshot11 = false;
  //boolean player_gate_intersection_oneshot12 = false;
  //boolean player_gate_intersection_oneshot13 = false;
  //boolean player_gate_intersection_oneshot14 = false;
  //boolean player_gate_intersection_oneshot15 = false;
  //boolean player_gate_intersection_oneshot16 = false;
  
        this.pg_intersection_holding_variable;  // hold on to the intersect point after the car passes the gate, will reset after moving some distance
        this.has_intersected = false;  // player crossed a gate, reset after position - PVector(gIntersectionx,y) = something big
        this.point_frame_counter = 0;
        this.point_frame_lastpoint = 0;
        this.break_toggle = false;

  
  // GA variables
        this.score;
        this.fitness;
        this.vision = [];
        this.action = [];
        this.brain;
        //float[] vision = new float[numInputNodes];  // number of sensors the car has
        //float[] action = new float[numOutputNodes];  // number of actions the car can take
        //NeuralNet brain;
        this.playerMotionTimer = 0;
        this.playerNotMoving = false;

        this.sensor1 = new createVector(0,-300);
        this.sensor2 = new createVector(150,-200);
        this.sensor3 = new createVector(100,0);
        this.sensor4 = new createVector(150,200);
        this.sensor5 = new createVector(0,300);
        this.sensor6 = new createVector(-150,200);
        this.sensor7 = new createVector(-100,0);
        this.sensor8 = new createVector(-150,-200);
        this.rectDiag = sqrt((this.p_length/2)*(this.p_length/2) + (this.p_width/2)*(this.p_width/2));
        this.rectAngle = atan2(this.p_width/2, this.p_length/2);
        this.score = 0;
        this.fitness = 0;
        this.isDead = false;
        this.point_frame_counter = 0;
        this.brain = new NeuralNet(numInputNodes,numHiddenNodes,numOutputNodes);
        this.player_gate_intersection = [];
    
        //player_gate_intersection_oneshot = new boolean[18];
        for(var i = 0; i < 17; i++) {
            this.player_gate_intersection_oneshot[i] = false;
        }
    
  } // player  onstructor
    
    applyForce(force) {
        var f = force;
        this.acceleration.add(f);
    } // applyforce
  
    applyDrag() {
        var tempangle = this.velocity.heading();
        var tempvec = p5.Vector.fromAngle(this.velocity.heading());
        tempvec.setMag(-0.19);
        this.acceleration.add(tempvec);
    }
  
  //---------------------------------------------------------------------
    show() {
        rectMode(CENTER);
        stroke(0);
        noFill();
        if(this.isDead == true) {
            fill(255,0,0);
        }
        strokeWeight(2);
        //angle = velocity.heading() + PI/2;
    
        // calc car position
        push();
        translate(this.position.x,this.position.y);
        rotate(this.angle);

        if(showPlayers) {
            //draw car
            rect(0, 0, this.p_length, this.p_width);
        }
    
        if(showSensors) {
            //draw sensors
            stroke(150);
            line(0,-this.p_width/2,this.sensor1.x,this.sensor1.y);
            //stroke(150);
            line(this.p_length/2,-this.p_width/2,this.sensor2.x,this.sensor2.y);
            //stroke(150);
             line(this.p_length/2,0,this.sensor3.x,this.sensor3.y);
            //stroke(255,0,0);
            line(this.p_length/2,this.p_width/2,this.sensor4.x,this.sensor4.y);
            //stroke(150);
            line(0,this.p_width/2,this.sensor5.x,this.sensor5.y);
            //stroke(150);
            line(-this.p_length/2,this.p_width/2,this.sensor6.x,this.sensor6.y);
            //stroke(150);
            line(-this.p_length/2,0,this.sensor7.x,this.sensor7.y);
            //stroke(150);
            line(-this.p_length/2,-this.p_width/2,this.sensor8.x,this.sensor8.y);
        } // showsensors
        pop();
     } // show
  
  //-----------------------------------------------------------------
    move() {
        this.update();
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.speed_limit);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    
        this.position.x = constrain(this.position.x,0,width - this.p_length);
        this.position.y = constrain(this.position.y,0,height - this.p_width);
    } // move
  
  //-----------------------------------------------------------------
    update() {
      //reset intersection points;
        this.i_point1 = null;
        this.i_point2 = null;
        this.i_point3 = null;
        this.i_point4 = null;
        this.s1Intersect = null;
        this.s2Intersect = null;
        this.s3Intersect = null;
        this.s4Intersect = null;
        this.s5Intersect = null;
        this.s6Intersect = null;
        this.s7Intersect = null;
        this.s8Intersect = null;
      
      // MOVE TO BOTTOM TO GET IT TO WORK
      //// CHECK IF PLAYER IS NOT MOVING AND KILL IT
      //if(playerNotMoving) {
      //    playerMotionTimer++;
      //    if(playerMotionTimer > 500) {
      //      //print("wtf");
      //      isDead = true;
      //    }
      //}
      
      
      
    
      // find the corners of the car and sensor segment points
        this.calculateCorners();
      
        if(showSensors) {
        // draw SENSOR aENDPOINT
            ellipse(this.s1x, this.s1y, 10, 10);
            ellipse(this.se1x, this.se1y,10,10);
            ellipse(this.s2x,this.s2y,10,10);
            ellipse(this.se2x,this.se2y,10,10);
            ellipse(this.s3x,this.s3y,10,10);
            ellipse(this.se3x,this.se3y,10,10);
            ellipse(this.s4x,this.s4y,10,10);
            ellipse(this.se4x,this.se4y,10,10);
            ellipse(this.s5x,this.s5y,10,10);
            ellipse(this.se5x,this.se5y,10,10);
            ellipse(this.s6x,this.s6y,10,10);
            ellipse(this.se6x,this.se6y,10,10);
            ellipse(this.s7x,this.s7y,10,10);
            ellipse(this.se7x,this.se7y,10,10);
            ellipse(this.s8x,this.s8y,10,10);
            ellipse(this.se8x,this.se8y,10,10);
        }
      
        //need to calulate the endpoints of the tranlated/rotated sensors.
        // calculateSensors();
        // draws the cars corner points using absolute coordinates
         //fill(255,0,0);
        //ellipse(p1x,p1y,10,10);
        //fill(0,255,0);
         //ellipse(p2x,p2y,10,10);
        //fill(0,0,255);
        //ellipse(p3x,p3y,10,10);
         //fill(255,0,255);
        //ellipse(p4x,p4y,10,10);
      
        // check if any of the 4 lines of the player intersects with any line in arraylist "line"
        //for (LineSeg l : lines) {
        //for (int i = lines.size() - 1; i >= 0; i--) {
        for(var i = 0; i <= lines.length - 1; i++) {
            // INTERSECTION WITH CAR
            if(this.i_point1 == null) {
                this.i_point1 = this.intersects(this.p4x, this.p4y, this.p1x, this.p1y, lines[i].v1.x, lines[i].v1.y, lines[i].v2.x, lines[i].v2.y);
            }
            if(this.i_point2 == null) {
                this.i_point2 = this.intersects(this.p1x, this.p1y, this.p2x, this.p2y, lines[i].v1.x, lines[i].v1.y, lines[i].v2.x, lines[i].v2.y);
            }
            if(this.i_point3 == null) {
                this.i_point3 = this.intersects(this.p3x, this.p3y, this.p2x, this.p2y, lines[i].v1.x, lines[i].v1.y, lines[i].v2.x, lines[i].v2.y);
            }
            if(this.i_point4 == null) {
                this.i_point4 = this.intersects(this.p3x, this.p3y, this.p4x, this.p4y, lines[i].v1.x, lines[i].v1.y, lines[i].v2.x, lines[i].v2.y);
            }
        // INTERSECTION WITH SENSORS
            if(this.s1Intersect == null) {
                this.s1Intersect = this.intersects(this.s1x,this.s1y,this.se1x,this.se1y,lines[i].v1.x,lines[i].v1.y,lines[i].v2.x,lines[i].v2.y);
            }
            if(this.s2Intersect == null) {
                this.s2Intersect = this.intersects(this.s2x,this.s2y,this.se2x,this.se2y,lines[i].v1.x,lines[i].v1.y,lines[i].v2.x,lines[i].v2.y);
            }
            if(this.s3Intersect == null) {
                this.s3Intersect = this.intersects(this.s3x,this.s3y,this.se3x,this.se3y,lines[i].v1.x,lines[i].v1.y,lines[i].v2.x,lines[i].v2.y);
            }
            if(this.s4Intersect == null) {
                this.s4Intersect = this.intersects(this.s4x,this.s4y,this.se4x,this.se4y,lines[i].v1.x,lines[i].v1.y,lines[i].v2.x,lines[i].v2.y);
            }
            if(this.s5Intersect == null) {
                this.s5Intersect = this.intersects(this.s5x,this.s5y,this.se5x,this.se5y,lines[i].v1.x,lines[i].v1.y,lines[i].v2.x,lines[i].v2.y);
            }
            if(this.s6Intersect == null) {
                this.s6Intersect = this.intersects(this.s6x,this.s6y,this.se6x,this.se6y,lines[i].v1.x,lines[i].v1.y,lines[i].v2.x,lines[i].v2.y);
            }
            if(this.s7Intersect == null) {
                this.s7Intersect = this.intersects(this.s7x,this.s7y,this.se7x,this.se7y,lines[i].v1.x,lines[i].v1.y,lines[i].v2.x,lines[i].v2.y);
            }
            if(this.s8Intersect == null) {
                this.s8Intersect = this.intersects(this.s8x,this.s8y,this.se8x,this.se8y,lines[i].v1.x,lines[i].v1.y,lines[i].v2.x,lines[i].v2.y);
            }
        }  // for
      
      //for(int i = 0; i <= gates.size() - 1; i++) {
        
        
        //--------------------POINTS-----------------------
        
        //cross gates for poins (remove yhe crossedgates() funciton)
      //for(Gates g : gates) {
        for (var i = 0; i <= gates.length - 1; i++) {
            gates[i].intersect_pt = this.intersects(this.p2x, this.p2y, this.p3x, this.p3y, gates[i].v1.x, gates[i].v1.y, gates[i].v2.x, gates[i].v2.y);
            this.player_gate_intersection[i] = this.intersects(this.p2x,this.p2y,this.p3x,this.p3y,gates[i].v1.x,gates[i].v1.y,gates[i].v2.x,gates[i].v2.y);
            if(this.player_gate_intersection[i] != null) {
                if(this.player_gate_intersection_oneshot[i] == false) {
                    this.pg_intersection_holding_variable = this.player_gate_intersection[i];
                    this.player_gate_intersection_oneshot[i] = true;
                    this.score = this.score + 2;
                    this.point_frame_lastpoint = 0;
                }
            }
            if(this.player_gate_intersection[i] == null && this.player_gate_intersection_oneshot[i] == true) {
                if(p5.Vector.dist(this.position,this.pg_intersection_holding_variable) > 1000) {
                    this.player_gate_intersection_oneshot[i] = false;
                }
             }
        }

     
      // draw the intersection point
        strokeWeight(1);
        stroke(0);
        if(this.i_point1 != null) {
            //fill(255,255,0);
            //ellipse(i_point1.x,i_point1.y,10,10);
            this.isDead = true;
        } 
        if(this.i_point2 != null) {
            //fill(255,255,0);
            //ellipse(i_point2.x,i_point2.y,10,10);
            this.isDead = true;
        }
        if(this.i_point3 != null) {
            //fill(255,255,0);
            //ellipse(i_point3.x,i_point3.y,10,10);
            this.isDead = true;
        } 
        if(this.i_point4 != null) {
            //fill(255,255,0);
            //ellipse(i_point4.x,i_point4.y,10,10);
            this.isDead = true;
        } 
      
        if(showSensors) {
            if(this.s1Intersect != null) {
                fill(255,255,0);
                ellipse(this.s1Intersect.x,this.s1Intersect.y,10,10);
            }
            if(this.s2Intersect != null) {
                fill(255,255,0);
                ellipse(this.s2Intersect.x,this.s2Intersect.y,10,10);
            }
            if(this.s3Intersect != null) {
                fill(255,255,0);
                ellipse(this.s3Intersect.x,this.s3Intersect.y,10,10);
            }
            if(this.s4Intersect != null) {
                fill(255,255,0);
                ellipse(this.s4Intersect.x,this.s4Intersect.y,10,10);
            }
            if(this.s5Intersect != null) {
                fill(255,255,0);
                ellipse(this.s5Intersect.x,this.s5Intersect.y,10,10);
            }
            if(this.s6Intersect != null) {
                fill(255,255,0);
                ellipse(this.s6Intersect.x,this.s6Intersect.y,10,10);
            }
            if(this.s7Intersect != null) {
                fill(255,255,0);
                ellipse(this.s7Intersect.x,this.s7Intersect.y,10,10);
            }
            if(this.s8Intersect != null) {
                fill(255,255,0);
                ellipse(this.s8Intersect.x,this.s8Intersect.y,10,10);
            }
        }
      
        if(this.i_point1 == null && this.i_point2 == null && this.i_point3 == null && this.i_point4 == null) {
            this.isDead = false;
        }
    
    
    //KILL SECTION:  KILL IF NO MOTION, KILL IF OSCILLATING: --> IF NO POINTS IN X FRAMES
      // CHECK IF PLAYER IS NOT MOVING AND KILL IT
        if(this.playerNotMoving) {
            this.playerMotionTimer++;
            if(this.playerMotionTimer > 500) {
                this.isDead = true;
            }
        }
        if(this.point_frame_lastpoint > 250) {
            this.isDead = true;
        }
      
      
      //if(point_frame_counter > 500) {
      //  isDead = true;
      //}
    
    
    
      // is this a duplicate? draw the sensor intersections
      //if(s1Intersect != null) {
      //    fill(255,255,0);
      //    ellipse(s1Intersect.x,s1Intersect.y,10,10);
      //  }     
    
        // apply forces from user input
        if(down == true) {
            var tempv = p5.Vector.fromAngle(this.angle - PI/2);
            tempv.setMag(-tempv.mag());
            this.applyForce(tempv);
        }
        if(up == true) {
            this.applyForce(p5.Vector.fromAngle(this.angle - PI/2).setMag(this.speed));
        } 
        if(right == true) {
            this.angle = this.angle  + this.rotate_speed;
        } // if right
        if(left == true) {
            this.angle = this.angle  - this.rotate_speed;
        } // if left
        
        // apply drag force
        this.applyDrag();
        this.point_frame_counter++;
        this.point_frame_lastpoint++;
    } // update
  
  //--------------------------------------------------------------------------
    calculateCorners () {
        // move to setup
        //float rectDiag = sqrt((p_length/2)*(p_length/2) + (p_width/2)*(p_width/2));
        //float rectAngle = atan2(p_width/2, p_length/2);
        
        //MAKE ENDPOINTS THIS WAY!!!!
        // how did I find the values to put in the equations?  trial and error :(
        // I tried using fancy matrix transformations but it was taking way to long to 
        // get it to work
        
        //sensor endpoints
        this.se1x = int(this.position.x + 300 * cos(-this.rectAngle - 0.45 + this.angle));
        this.se1y = int(this.position.y + 300 * sin(-this.rectAngle - 0.45 + this.angle));
        
        this.s1x = int(this.position.x + 25 * cos(-this.rectAngle - 0.4 + this.angle));
        this.s1y = int(this.position.y + 25 * sin(-this.rectAngle - 0.4 + this.angle));
        
        this.se2x = int(this.position.x + 250 * cos(-this.rectAngle + 0.20 + this.angle));
        this.se2y = int(this.position.y + 250 * sin(-this.rectAngle + 0.20 + this.angle));
        
        this.s2x = int(this.position.x + 27 * cos(-this.rectAngle - 0.0 + this.angle));
        this.s2y = int(this.position.y + 27 * sin(-this.rectAngle - 0.0 + this.angle));
        
        this.se3x = int(this.position.x + 100 * cos(-this.rectAngle + 1.15 + this.angle));
        this.se3y = int(this.position.y + 100 * sin(-this.rectAngle + 1.15 + this.angle));
        
        this.s3x = int(this.position.x - 12 * cos(-this.rectAngle - 1.9 + this.angle));
        this.s3y = int(this.position.y - 12 * sin(-this.rectAngle - 1.9 + this.angle));
        
        this.se4x = int(this.position.x + 250 * cos(-this.rectAngle + 2.05 + this.angle));
        this.se4y= int(this.position.y + 250 * sin(-this.rectAngle + 2.05 + this.angle));
        
        this.s4x = int(this.position.x + 27 * cos(-this.rectAngle + 2.25 + this.angle));
        this.s4y = int(this.position.y + 27 * sin(-this.rectAngle + 2.25 + this.angle));
        
        this.se5x= int(this.position.x - 300 * cos(-this.rectAngle - 0.45 + this.angle));
        this.se5y = int(this.position.y - 300 * sin(-this.rectAngle - 0.45 + this.angle));
        
        this.s5x = int(this.position.x - 25 * cos(-this.rectAngle - 0.4 + this.angle));
        this.s5y = int(this.position.y - 25 * sin(-this.rectAngle - 0.4 + this.angle));
        
        this.se6x= int(this.position.x - 250 * cos(-this.rectAngle + 6.48 + this.angle));
        this.se6y = int(this.position.y - 250 * sin(-this.rectAngle + 6.48 + this.angle));
        
        this.s6x = int(this.position.x - 27 * cos(-this.rectAngle + 6.33 + this.angle));
        this.s6y = int(this.position.y - 27 * sin(-this.rectAngle + 6.33 + this.angle));
        
        this.se7x= int(this.position.x - 100 * cos(-this.rectAngle + 1.15 + this.angle));
        this.se7y = int(this.position.y - 100 * sin(-this.rectAngle + 1.15 + this.angle));
        
        this.s7x = int(this.position.x + 12 * cos(-this.rectAngle - 1.9 + this.angle));
        this.s7y = int(this.position.y + 12 * sin(-this.rectAngle - 1.9 + this.angle));
        
        this.se8x= int(this.position.x - 250 * cos(-this.rectAngle + 8.333 + this.angle));
        this.se8y = int(this.position.y - 250 * sin(-this.rectAngle + 8.333 + this.angle));
        
        this.s8x = int(this.position.x - 28 * cos(-this.rectAngle + 8.5 + this.angle));
        this.s8y = int(this.position.y - 28 * sin(-this.rectAngle + 8.5 + this.angle));
        
        // car endpoints
        this.p1x = int(this.position.x + -this.rectDiag * cos(-this.rectAngle + this.angle));
        this.p1y = int(this.position.y + -this.rectDiag * sin(-this.rectAngle + this.angle));
        
        // cx2 cy2
        this.p2x = int(this.position.x + this.rectDiag * cos(this.rectAngle + this.angle));
        this.p2y = int(this.position.y + this.rectDiag * sin(this.rectAngle + this.angle));
        
        // cx3 cy3
        this.p3x = int(this.position.x + this.rectDiag * cos(-this.rectAngle + this.angle));
        this.p3y = int(this.position.y + this.rectDiag * sin(-this.rectAngle + this.angle));
        
        // cx4 cy4
        this.p4x = int(this.position.x + -this.rectDiag * cos(this.rectAngle + this.angle));
        this.p4y = int(this.position.y + -this.rectDiag * sin(this.rectAngle + this.angle));
    } //calc
  
  //----------------------------------------------------------------
  // this is the function that calculates the intersection points in the static coordinate frame
    intersects(x1, y1, x2, y2, x3, y3, x4, y4) { 
        var bx = x2 - x1; 
        var by = y2 - y1; 
        var dx = x4 - x3; 
        var dy = y4 - y3;
        var b_dot_d_perp = bx * dy - by * dx;
        if (b_dot_d_perp == 0) {
            return null;
        }
        var cx = x3 - x1;
        var cy = y3 - y1;
        var t = (cx * dy - cy * dx) / b_dot_d_perp;
        if (t < 0 || t > 1) {
            return null;
        }
        var u = (cx * by - cy * bx) / b_dot_d_perp;
        if (u < 0 || u > 1) { 
            return null;
        }
        return new createVector(x1+t*bx,y1+t*by);
    } // intersecting
  
  
  //----------------------------------------------------------------------
  // need to change from g.blahblah to player 
  // has player crossed a gate
  // make sure to add a reset to the has_intersected
 // void crossed_gate() {
     //for (Gates g: gates) {
    // if(pg_intersection_oneshot1 == true && pg_intersection_oneshot2 == false) {
    //   pg_intersection_oneshot2 = true;
    //   score = score + 1;
     //  point_frame_lastpoint = 0;
   //  }
     //if(pg_intersection_oneshot1 == true && pg_intersection_oneshot2 == true) {
       //PVector tempvec = PVector.sub(position,pg_intersection_holding_variable);
       //float tempvec = PVector.dist(position,pg_intersection_holding_variable);
       //print(" tempvec: " + tempvec);
      // if(tempvec > 1) {
//pg_intersection_oneshot1 = false;
         //pg_intersection_oneshot1 = false;
       //}
     //}
       
       
       //if(has_intersected == false && pg_intersection_oneshot == true) {
       //   has_intersected = true;
       //   score = score + 1;
       //}
       //print(pg_intersection_holding_variable);
       //print(position);
       //PVector tempvec = PVector.sub(pg_intersection_holding_variable,position);
       //if(tempvec.mag() > 200) {
       //  has_intersected = false;
       //  pg_intersection_oneshot = false;
       //}
          
       
       
       
          //if(hasIntersected == false && g.intersect_pt != null) {
          //   hasIntersected = true;
          //   score = score + g.point_value;
          //   point_frame_counter = 0;
          //}
          //if(g.has_intersected) {
          //  if(position.dist(g.v1) > 1000) {
          //    g.has_intersected = false;
          //  }
          //}  
         //} // 
    
 // } // crossed_gate
  
  //--------------------------------------------------------------
  // GA CODE STARTS HERE
  //--------------------------------------------------------------
  //TODO:  NEED TO MAKE AN ORIENTATION VARIABLE AND HAVE ALL THE VISIONS POSATIVE IN ALL DIRECTIONS,
  // AND MAYBE KILL THE NORMALIZATIONS.
  //get inputs for Neural network
  // AAAAAHHHHHH DUMMY, YOU NEED POSITION.X AND POSISITON.Y AS INPUTS!
    look() {    // NEED TO NORMALIZE VISION!!
      //vision[0] = position.x / width;
      //vision[1] = position.y / height;
      
      // change to distances
        if(this.s1Intersect != null) {
            this.vision[0] = abs(p5.Vector.dist(new createVector(this.position.x,this.position.y),new createVector(this.s1Intersect.x,this.s1Intersect.y))) / 300;
        } else {
            this.vision[0] = 300/300;
        }
        if(this.s2Intersect != null) {
            this.vision[1] = abs(p5.Vector.dist(new createVector(this.position.x,this.position.y),new createVector(this.s2Intersect.x,this.s2Intersect.y))) / 250;
        } else {
            this.vision[1] = 250/250;
        }
        if(this.s3Intersect != null) {
            this.vision[2] = abs(p5.Vector.dist(new createVector(this.position.x,this.position.y),new createVector(this.s3Intersect.x,this.s3Intersect.y)))/100;
        } else {
            this.vision[2] = 100/100;
        }
        if(this.s4Intersect != null) {
            this.vision[3] = abs(p5.Vector.dist(new createVector(this.position.x,this.position.y),new createVector(this.s4Intersect.x,this.s4Intersect.y)))/250;
        } else {
            this.vision[3] = 250/250;
        }
        if(this.s5Intersect != null) {
            this.vision[4] = abs(p5.Vector.dist(new createVector(this.position.x,this.position.y),new createVector(this.s5Intersect.x,this.s5Intersect.y)))/300;
        } else {
            this.vision[4] = 300/300;
        }
        if(this.s6Intersect != null) {
            this.vision[5] = abs(p5.Vector.dist(new createVector(this.position.x,this.position.y),new createVector(this.s6Intersect.x,this.s6Intersect.y)))/250;
        } else {
            this.vision[5] = 250/250;
        }
        if(this.s7Intersect != null) {
            this.vision[6] = abs(p5.Vector.dist(new createVector(this.position.x,this.position.y),new createVector(this.s7Intersect.x,this.s7Intersect.y)))/100;
        } else {
            this.vision[6] = 100/100;
        }
        if(this.s8Intersect != null) {
            this.vision[7] = abs(p5.Vector.dist(new createVector(this.position.x,this.position.y),new createVector(this.s8Intersect.x,this.s8Intersect.y)))/250;
        } else {
            this.vision[7] = 250/250;
        }
      //if(s1Intersect != null) {
      //    vision[2] = (position.x - s1Intersect.x) / width;
      //    vision[3] = (position.y - s1Intersect.y) / height;
      //} else {
      //    vision[2] = 1;
      //    vision[3] = 1;
      //}
      //if(s2Intersect != null) {
      //    vision[4] = (position.x - s2Intersect.x) / width;
      //    vision[5] = (position.y - s2Intersect.y) / height;
      //} else {
      //    vision[4] = 1;
      //    vision[5] = 1;
      //}
      //if(s3Intersect != null) {
      //    vision[6] = (position.x - s3Intersect.x) / width;
      //    vision[7] = (position.y - s3Intersect.y) / height;
      //} else {
      //    vision[6] = 1;
      //    vision[7] = 1;
      //}
      //if(s4Intersect != null) {
      //    vision[8] = (position.x - s4Intersect.x) / width;
      //    vision[9] = (position.y - s4Intersect.y) / height;
      //} else {
      //    vision[8] = 1;
      //    vision[9] = 1;
      //}
      //if(s5Intersect != null) {
      //    vision[10] = (-position.x + s5Intersect.x) / width;
      //    vision[11] = (-position.y + s5Intersect.y) / height;
      //} else {
      //    vision[10] = 1;
      //    vision[11] = 1;
      //}
      //if(s6Intersect != null) {
      //    vision[12] = (-position.x + s6Intersect.x) / width;
      //    vision[13] = (-position.y + s6Intersect.y) / height;
      //} else {
      //    vision[12] = 1;
      //    vision[13] = 1;
      //}
      //if(s7Intersect != null) {
      //    vision[14] = (-position.x + s7Intersect.x) / width;
      //    vision[15] = (-position.y + s7Intersect.y) / height;
      //} else {
      //    vision[14] = 1;
      //    vision[15] = 1;
      //}
      //if(s8Intersect != null) {
      //    vision[16] = (-position.x + s8Intersect.x) / width;
      //    vision[17] = (-position.y + s8Intersect.y) / height;
      //} else {
      //    vision[16] = 1;
      //    vision[17] = 1;
      //}
    } // look
  
    think() {
    this.action = this.brain.output(this.vision);
    
        if(this.action[0] > 0.5) {
            up = true;
        } else {
            up = false;
        }
        if(this.action[1] > 0.5) {
            left = true;
        } else {
            left = false;
        }
        if(this.action[2] > 0.5) {
            right = true;
        } else {
            right = false;
        }
        //if(!up && action[3] > 0.5) {
        if(this.action[3] > 0.5) {
            down = true;
        } else {
            down = false;
        }
        
        // check if player not moveing forward or back
        if(up == false && down == false) {
            this.playerNotMoving = true;
        } else {
            this.playerNotMoving = false;
            this.playerMotionTimer = 0;
        }
    
    } // think
  
  //for genetic algorithm
    calculateFitness() {
        this.fitness = this.score * this.score * this.score;
    } // calcitness
  
  //---------------------------------------------------------------------------------------------------------------------------------------------------------  
    mutate() {
        this.brain.mutate(globalMutationRate);
    } // mutate
  //---------------------------------------------------------------------------------------------------------------------------------------------------------  
  //returns a clone of this player with the same brian
    clone() {
        var clone = new Player(1650,1440);
        clone.brain = this.brain.clone();
        return clone;
    } // clone
  //---------------------------------------------------------------------------------------------------------------------------------------------------------  
    crossover(parent2) {
        var child = new Player(1650,1440);
        child.brain = this.brain.crossover(parent2.brain);
        return child;
    } // crossover
  
    savePlayer() {
        var weights_json_object = {
            "weight_ih" : {
                "rows" : popul.players[lowest_alive].brain.weight_ih.rows,
                "cols" : popul.players[lowest_alive].brain.weight_ih.cols,
                "data" : popul.players[lowest_alive].brain.weight_ih.data
            },
            "weight_hh" : {
                "rows" : popul.players[lowest_alive].brain.weight_hh.rows,
                "cols" : popul.players[lowest_alive].brain.weight_hh.cols,
                "data" : popul.players[lowest_alive].brain.weight_hh.data
            },
            "weight_ho" : {
                "rows" : popul.players[lowest_alive].brain.weight_ho.rows,
                "cols" : popul.players[lowest_alive].brain.weight_ho.cols,
                "data" : popul.players[lowest_alive].brain.weight_ho.data
            }
        };
        saveJSON(weights_json_object, 'saved_player.json');
    }

        //saveTable(this.brain.NetToTable(), "data/player.csv", "csv");
        //saveJSON(this.brain.weight_ih.data,'ih.json');
        //saveJSON(this.brain.weight_hh.data,'hh.json');
        //saveJSON(this.brain.weight_ho.data,'ho.json');
    
   
   // moved ot Population
  //  //loads the saved brain to the lowest alive player, hopefully does well and is cloned
  //void loadPlayer() {
  //  Table t = loadTable("data/player.csv");
  //  brain.TableToNet(t);
  //}
  
  
  //void my_transform(float x1_,float y1_) {
     //s1endx = (x1_+position.x) * cos(rectAngle + angle) - (y1_+position.y) * sin(rectAngle + angle);
     //s1endy = (x1_+position.x) * sin(rectAngle + angle) + (y1_+position.y) * cos(rectAngle + angle);
     //s1endx = (x1_ * cos(angle) - y1_ * sin(angle)) * (1 + position.x);
     //s1endy = (x1_ * sin(angle) + y1_ * cos(angle)) * (1 + position.y);
     //pm.invert();
//}
  
}  // player
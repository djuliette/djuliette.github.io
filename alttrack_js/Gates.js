class Gates {
    constructor(v1_, v2_) {
    this.v1 = v1_;
    this.v2 = v2_;
    this.intersect_pt = new createVector(0,0);
    this.has_intersected = false;
    this.point_value = 1;
    }// constructor
    
    show() {
      if(showSensors) {
        stroke(0,0,255);
        strokeWeight(2);
        line(this.v1.x,this.v1.y,this.v2.x,this.v2.y);
        if(this.intersect_pt != null) {
          fill(255,255,0);
          ellipse(this.intersect_pt.x,this.intersect_pt.y,10,10);
        }
      }
    } // show
} // Gates
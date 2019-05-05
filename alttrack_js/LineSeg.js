class LineSeg {
    constructor(v1_,v2_) {
        this.v1;
        this.v2;
        this.intersect_pt;
    
       this.v1 = v1_;
       this.v2 = v2_;
       this.intersect_pt = new createVector(0,0);
    }// constructor
    
    show() {
      stroke(0);
      line(this.v1.x,this.v1.y,this.v2.x,this.v2.y);
      if(this.intersect_pt.mag() != 0) {
        fill(255,255,0);
        ellipse(this.intersect_pt.x,this.intersect_pt.y,10,10);
      }
    }
    
  } // line
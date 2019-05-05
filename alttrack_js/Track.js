class Track {
    constructor() {
      var point1;
      var point2;
      var point3;
      var point4;
      var point5;
      var point6;
      var point7;
      var point8;
      var point8p;
      var point9;
      var point10;
      var point11;
      var point12;
      var point13;
      var point14;
      var point15;
      var point16;
      var point17;
      var point18;
      var point19;
      var point20;
      var point21;
      var point22;
      var point23;
      var point24;
      var point25;
      var point26;
      var point27;
      var point28;
    
      
      // gate points
      var gpoint1;
      var gpoint2;
      var gpoint3;
      var gpoint4;
      var gpoint5;
      var gpoint6;
      var gpoint7;
      var gpoint8;
      var gpoint9;
      var gpoint10;
      var gpoint11;
      var gpoint12;
      var gpoint13;
      var gpoint14;
      var gpoint15;
      var gpoint16;
      var gpoint17;
      var gpoint18;
      var gpoint19;
      var gpoint20;
      var gpoint21;
      var gpoint23a;
      var gpoint23b;
      var gpoint22;
      var gpoint23;
      var gpoint24;
      var gpoint25;
      var gpoint26;
      var gpoint27;
      var gpoint28;
      var gpoint29;
      var gpoint30;
      var gpoint31;
      var gpoint32;
      var gpoint33;
      var gpoint34;
      
      
        //lines = [];
        //gates = [];
        
        point1 = new createVector(1700,1375);
        point2 = new createVector(1400,1000);
        point3 = new createVector(900,1000);
        point4 = new createVector(400,1375);
        point5 = new createVector(200,1100);
        point6 = new createVector(200,400);
        point7 = new createVector(400,200);
        point8 = new createVector(600,400);
        point9 = new createVector(1500,400);
        point10 = new createVector(1700,200);
        point11 = new createVector(2000,400);
        point12 = new createVector(2000,1100);
        
        point13 = new createVector(1600, 1599);
        point14 = new createVector(1300, 1250);
        point15 = new createVector(900, 1250);
        point16 = new createVector(400, 1599);
        point17 = new createVector(250, 1599);
        point18 = new createVector(10, 1275);
        point19 = new createVector(10, 300);
        point20 = new createVector(300, 10);
        point21 = new createVector(550, 10);
        point22 = new createVector(700, 210);
        point23 = new createVector(1400, 210);
        point24 = new createVector(1600, 10);
        point25 = new createVector(1800, 10);
        point26 = new createVector(2175, 250);
        point27 = new createVector(2175, 1250);
        point28 = new createVector(1800, 1599);
        
        lines.push(new LineSeg(point1, point2));
        lines.push(new LineSeg(point2, point3));
        lines.push(new LineSeg(point3, point4));
        lines.push(new LineSeg(point4, point5));
        lines.push(new LineSeg(point5, point6));
        lines.push(new LineSeg(point5, point6));
        lines.push(new LineSeg(point6, point7));
        lines.push(new LineSeg(point7, point8));
        lines.push(new LineSeg(point8, point9));
        lines.push(new LineSeg(point9, point10));
        lines.push(new LineSeg(point10, point11));
        lines.push(new LineSeg(point11, point12));
        lines.push(new LineSeg(point12, point1));
        
        lines.push(new LineSeg(point13, point14));
        lines.push(new LineSeg(point14, point15));
        lines.push(new LineSeg(point15, point16));
        lines.push(new LineSeg(point16, point17));
        lines.push(new LineSeg(point17, point18));
        lines.push(new LineSeg(point18, point19));
        lines.push(new LineSeg(point19, point20));
        lines.push(new LineSeg(point20, point21));
        lines.push(new LineSeg(point21, point22));
        lines.push(new LineSeg(point22, point23));
        lines.push(new LineSeg(point23, point24));
        lines.push(new LineSeg(point24, point25));
        lines.push(new LineSeg(point25, point26));
        lines.push(new LineSeg(point26, point27));
        lines.push(new LineSeg(point27, point28));
        lines.push(new LineSeg(point28, point13));
        
    
        gpoint1 = new createVector(1250,1000);
        gpoint2 = new createVector(1250,1250);
        gpoint3 = new createVector(900, 1000);
        gpoint4 = new createVector(900 ,1250);
        gpoint5 = new createVector(600,1200);
        gpoint6 = new createVector(700,1400);
        gpoint7 = new createVector(400,1350);
        gpoint8 = new createVector(500,1550);
        gpoint9 = new createVector(300,1200);
        gpoint10 = new createVector(100,1400);
        gpoint11 = new createVector(210,900);
        gpoint12 = new createVector(5,900);
        gpoint13 = new createVector(10,275);
        gpoint14 = new createVector(200,400);
        gpoint15 = new createVector(400,10);
        gpoint16 = new createVector(400,250);
        gpoint17 = new createVector(700,200);
        gpoint18 = new createVector(600,425);
        gpoint19 = new createVector(1400,200);
        gpoint20 = new createVector(1500,425);
        gpoint21 = new createVector(1700,200);
        gpoint22 = new createVector(1700,10);
        gpoint23a = new createVector(2000,400); // new
        gpoint23b = new createVector(2200,250); // new
        gpoint23 = new createVector(2000,1100);
        gpoint24 = new createVector(2200,1250);
        gpoint25 = new createVector(1700,1300);
        gpoint26 = new createVector(1700,15000);
    
        
        gates.push(new Gates(gpoint1,gpoint2));
        gates.push(new Gates(gpoint3,gpoint4));
        gates.push(new Gates(gpoint5,gpoint6));
        gates.push(new Gates(gpoint7,gpoint8));
        gates.push(new Gates(gpoint9,gpoint10));
        gates.push(new Gates(gpoint11,gpoint12));
        gates.push(new Gates(gpoint13,gpoint14));
        gates.push(new Gates(gpoint15,gpoint16));
        gates.push(new Gates(gpoint17,gpoint18));
        gates.push(new Gates(gpoint19,gpoint20));
        gates.push(new Gates(gpoint21,gpoint22));
        gates.push(new Gates(gpoint23a,gpoint23b));
        gates.push(new Gates(gpoint23,gpoint24));
        gates.push(new Gates(gpoint25,gpoint26));
      
    } // track
    
  } // track
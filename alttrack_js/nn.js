class NeuralNet {
    constructor(numINodes, numHNodes, numONodes) {
      this.i_nodes = numINodes;
      this.h_nodes = numHNodes;
      this.o_nodes = numONodes;
      
      this.weight_ih = new Matrix(this.h_nodes, this.i_nodes + 1);
      this.weight_hh = new Matrix(this.h_nodes, this.h_nodes + 1);
      this.weight_ho = new Matrix(this.o_nodes, this.h_nodes + 1);
      
      this.weight_ih.randomize();
      this.weight_hh.randomize();
      this.weight_ho.randomize();
      
    } // constructor
    
    output(inputs_array) {
      var inputs = this.weight_ih.fromArray(inputs_array);
      var inputBias = inputs.addBias();
      var hiddenInputs = this.weight_ih.dot(inputBias);
      var hiddenOutputs = hiddenInputs.activate();
      var hiddenOutputsBias = hiddenOutputs.addBias();
      var hiddenInputs2 = this.weight_hh.dot(hiddenOutputsBias);
      var hiddenOutputs2 = hiddenInputs2.activate();
      var hiddenOutputs2Bias = hiddenOutputs2.addBias();
      var hiddenOutputInputs = this.weight_ho.dot(hiddenOutputs2Bias);
      var outputs = hiddenOutputInputs.activate();
      return outputs.toArray();
    }
    
    mutate(mr) {
      this.weight_ih.mutate(mr);
      this.weight_hh.mutate(mr);
      this.weight_ho.mutate(mr);
    }
    
    crossover(parent) {
      var child = new NeuralNet(numInputNodes,numHiddenNodes,numOutputNodes);
      child.weight_ih = this.weight_ih.crossover(parent.weight_ih);
      child.weight_hh = this.weight_hh.crossover(parent.weight_hh);
      child.weight_ho = this.weight_ho.crossover(parent.weight_ho);
      return child;
    }
    
    clone() {
      var clone = new NeuralNet(numInputNodes,numHiddenNodes,numOutputNodes);
      clone.weight_ih = this.weight_ih.clone();
      clone.weight_hh = this.weight_hh.clone();
      clone.weight_ho = this.weight_ho.clone();
  
      return clone;
    } // clone
    

  //---------------------------------------------------------------------------------------------------------------------------------------------------------  
  //converts the weights matrices to a single table 
  //used for storing the snakes brain in a file
  NetToTable() {

    //create table
    var t = new p5.Table();


    //convert the matricies to an array 
    var whiArr = this.weight_ih.toArray();
    var whhArr = this.weight_hh.toArray();
    var wohArr = this.weight_ho.toArray();

    //set the amount of columns in the table
    var themax = max(whiArr.length, whhArr.length, wohArr.length)
    for (var i = 0; i< themax; i++) {
      t.addColumn();
    }

    //set the first row as whi
    var tr = t.addRow();

    for (var i = 0; i< whiArr.length; i++) {
      tr.setNum(i, whiArr[i]);
    }


    //set the second row as whh
    tr = t.addRow();

    for (var i = 0; i< whhArr.length; i++) {
      tr.setNum(i, whhArr[i]);
    }

    //set the third row as woh
    tr = t.addRow();

    for (var i = 0; i< wohArr.length; i++) {
      tr.setNum(i, wohArr[i]);
    }

    //return table
    return t;
  }

//---------------------------------------------------------------------------------------------------------------------------------------------------------  
  //takes in table as parameter and overwrites the matrices data for this neural network
  //used to load snakes from file
  TableToNet(t) {
    console.log("called tble to net")
    //create arrays to tempurarily store the data for each matrix
    var whiArr = [];
    var whhArr = [];
    var wohArr = [];

    //set the whi array as the first row of the table
    var tr = t.getRow(1);
    //print(tr);

    for (var i = 0; i< whiArr.length; i++) {
      whiArr[i] = tr.getNum(i);
    }
    //print(whiArr);

    //set the whh array as the second row of the table
    tr = t.getRow(2);

    for (var i = 0; i< whhArr.length; i++) {
      whhArr[i] = tr.getNum(i);
    }

    //set the woh array as the third row of the table

    tr = t.getRow(3);

    for (var i = 0; i< wohArr.length; i++) {
      wohArr[i] = tr.getNum(i);
    }


    //convert the arrays to matrices and set them as the layer matrices 
    this.weight_ih.fromArray(whiArr);
    this.weight_hh.fromArray(whhArr);
    this.weight_ho.fromArray(wohArr);
  }




  } // nn
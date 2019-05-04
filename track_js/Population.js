class Population {
    constructor(size) {
        this.players = [];
        this.bestPlayerNo;
        this.gen = 0;
        this.bestPlayer = new Player(1650,1440);
        this.bestScore = 0;  
        this.pop_size = size;
        this.allTimeHigh = 0;
        this.numAlive = 0;
        //this.players = new Player[pop_size];
        for (var i =0; i <= this.pop_size - 1; i++) {
            this.players[i] = new Player(1650,1440);
        }
    } // constructor
  
  
    //------------------------------------------------------------------------------------------------------------------------------------------
  //update all the players which are alive
    updateAlive() {
        for (var i = 0; i <= this.pop_size - 1; i++) {
            if (this.players[i].isDead == false) {
                lowest_alive = i;
                break;
            }
        }
    
        max_alive = 0;
        maxIndexAlive = 0;
        for(var i = 0; i <= this.pop_size - 1; i++) {
            if (this.players[i].score > max_alive) {
                max_alive = this.players[i].score;
                maxIndexAlive = i;
            }
        }
    
        numAlive = 0;
        for (var i = 0; i <= this.pop_size - 1; i++) {
            if (!this.players[i].isDead) {
                this.players[i].look();//get inputs for brain 
                this.players[i].think();//use outputs from neural network
                this.players[i].move();//move the player according to the outputs from the neural network
                //players[i].crossed_gate();
                this.players[i].show();
                //players[i].dead = players[i].checkHit();
                //speed = 10;
                numAlive++;
            //}
            }
        }
    } // updateAlive
  
  //------------------------------------------------------------------------------------------------------------------------------------------
  //sets the best player globally and for this gen
    setBestPlayer() {
    //get max fitness
        maxf =0;
        maxIndex = 0;
        for (var i =0; i<=this.pop_size - 1; i++) {
            if (this.players[i].fitness > maxf) {
                maxf = this.players[i].fitness;
                maxIndex = i;
            }
        }

        this.bestPlayerNo = maxIndex;

    //if best this gen is better than the global best score then set the global best as the best this gen

        if (this.players[this.bestPlayerNo].score > this.bestScore) {
            this.bestScore = this.players[this.bestPlayerNo].score;
            this.allTimeHigh = this.bestScore;
            this.bestPlayer = this.players[this.bestPlayerNo].clone();
      
            //players[bestPlayerNo].brain.draw_weights();
        }
    //print(" bestplayer: " + bestPlayerNo);
    //print(" bestplayer score: " + players[bestPlayerNo].score);
    } // setBestPlayer
  
  
  //  //loads the saved brain to the lowest alive player, hopefully does well and is cloned
    loadPlayer() {

        for(var i = 0; i<= this.pop_size - 1; i++) {
            this.players[i].brain.weight_ih.data = bestBrain.weight_ih.data;
            this.players[i].brain.weight_hh.data = bestBrain.weight_hh.data;
            this.players[i].brain.weight_ho.data = bestBrain.weight_ho.data;

        }

        //console.log('loading player')
        //t = loadTable("data/player_javascript_best.csv",this.loadedPlayer(),this.errorLoadPlayer());
        //print(t);
       // for (var i = 0; i<= this.pop_size - 1; i++) {
       //     this.players[i].brain.TableToNet(t);
            //this.players[i].brain.weight_ih.data = loadJSON('/data/ih.json');
            //this.players[i].brain.weight_hh.data = loadJSON('/data/hh.json');
            //this.players[i].brain.weight_ho.data = loadJSON('/data/ho.json');
        
       // this.players[i].brain.weight_ih.data = alright.data
    }

    loadedPlayer() {
        console.log("sucessfully loaded player");
    }

    errorLoadPlayer(response) {
        console.log("error on load player " + response);
    }
  
  
  //------------------------------------------------------------------------------------------------------------------------------------------
  //returns true if all the players are dead      sad
    done() {
        for (var i = 0; i<= this.pop_size - 1; i++) {
            if (!this.players[i].isDead) {
                return false;
            }
        }
        return true;
    }  // done
  
  //------------------------------------------------------------------------------------------------------------------------------------------
  //creates the next generation of players by natural selection

    naturalSelection() {

        var newPlayers = [];//Create new players array for the next generation
        this. setBestPlayer();//set which player is the best

        newPlayers[0] = this.players[this.bestPlayerNo].clone();//add the best player of this generation to the next generation without mutation
        for (var i = 1; i<=this.pop_size - 1; i++) {
            //for each remaining spot in the next generation
            //if (i<pop_size/3) {\
            if(i < 35) {
                newPlayers[i] = this.players[this.bestPlayerNo].clone();//select a random player(based on fitness) and clone it
            } else if(i >= 35 && i < 300) {
                newPlayers[i] = this.selectPlayer().clone();
            } else {
                newPlayers[i] = this.selectPlayer().crossover(this.selectPlayer());
            }
            //newPlayers[i].mutate(); //mutate it
        }
        for(var k = 10; k <= this.pop_size -1; k++) {
            newPlayers[k].mutate();
        }

        //NEED TO ITERATE THROUGH PLAYERS
        for(var i = 0; i<=this.pop_size - 1; i++) {
            this.players[i] = newPlayers[i].clone();
        }
        this.gen+=1;
    //print(" `max` fitness: " + max);
    //print(" max points: " + players[maxIndex].score);
    //print(" max index: " + maxIndex);
    } // naturalSelection
  
  //------------------------------------------------------------------------------------------------------------------------------------------
  //chooses player from the population to return randomly(considering fitness)
  
    selectPlayer() {
    //this function works by randomly choosing a value between 0 and the sum of all the fitnesses
    //then go through all the players and add their fitness to a running sum and if that sum is greater than the random value generated that player is chosen
    //since players with a higher fitness function add more to the running sum then they have a higher chance of being chosen

    //calculate the sum of all the fitnesses
        this.fitnessSum = 0;
        for (var i =0; i<=this.pop_size - 1; i++) {
            this.fitnessSum += this.players[i].fitness;
            //print(fitnessSum);
            }
        var rand = floor(random(this.fitnessSum));
        //summy is the current fitness sum
        var runningSum = 0;

        for (var i = 0; i<=this.pop_size - 1; i++) {
            runningSum += this.players[i].fitness; 
            if (runningSum > rand) {
                return this.players[i];
            }
        }
    //unreachable code to make the parser happy
        return this.players[0];
    } // selectPlayer
  
  //------------------------------------------------------------------------------------------------------------------------------------------

  //mutates all the players
    mutate() {
        for (var i =1; i<= this.pop_size - 1; i++) {
            this.players[i].mutate();
        }
    }  // mutate
  //------------------------------------------------------------------------------------------------------------------------------------------
  
  //calculates the fitness of all of the players
    calculateFitness() {
        for (var i =0; i<= this.pop_size - 1; i++) {
            this.players[i].calculateFitness();
            //print(" player: " + i + " points: " + players[i].score + " fitness: " + players[i].fitness); 
        }
    } // calculateFitness
  
  
} // population
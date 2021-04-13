"use strict";

import * as ModuleBlock from "./block.mjs"
import * as ModuleDom from "./domObject.mjs";

export class Snake extends ModuleBlock.Block {

    constructor(){

        super();
        this.corps = [];
        this.longueurInit = 10;
        this.positionXtete = ModuleDom.canvas.width / 2;
        this.positionYtete = ModuleDom.canvas.height /2;
        this.directionInitX = 37 ; //gauche

    }


    init(){

        var decalage = 0;

        for(let i = 0; i < this.longueurInit; i++){

           if(i == 0){

            this.corps.push(new ModuleBlock.Block(this.positionXtete, this.positionYtete));
            decalage = this.positionXtete + this.width;

           } else {

            this.corps.push(new ModuleBlock.Block(decalage, this.positionYtete));
            decalage += this.width;

           }


        }

    }

    dessiner(){


        for (const partie of this.corps){

            ModuleDom.ctx.beginPath();
            ModuleDom.ctx.fillStyle = this.couleur;
            ModuleDom.ctx.fillRect(partie.positionX,partie.positionY,partie.width, partie.height);
            ModuleDom.ctx.closePath();

        }

    }

    directionSnake(code, direction){

        var temp, temp2;

        if( code == 37 || code == 39){

            for(let i = 0; i < this.corps.length; i += 2){
               
                if( i == 0){

                    temp = JSON.parse(JSON.stringify(this.corps[i]));
                    this.corps[i].positionX *= direction;
                    this.corps[i].positionX += this.corps[i].width;
                    this.corps[i].positionX = Math.abs(this.corps[i].positionX);
                    temp2 = JSON.parse(JSON.stringify(this.corps[i + 1]))
                    this.corps[i + 1] = temp; 

                } else if(i == this.corps.length -1){

                    this.corps[i] = temp2;

                } else  {

                    temp = JSON.parse(JSON.stringify(this.corps[i]));
                    this.corps[i] = temp2;
                    temp2 = JSON.parse(JSON.stringify(this.corps[i + 1]));
                    this.corps[i + 1] = temp;   
              }    
            }      


        } else {

            for(let i = 0; i < this.corps.length; i += 2){
               
                if(i == 0){

                    temp = JSON.parse(JSON.stringify(this.corps[i]));
                    this.corps[i].positionY *= direction;
                    this.corps[i].positionY += this.corps[i].width;
                    this.corps[i].positionY = Math.abs(this.corps[i].positionY);
                    temp2 = JSON.parse(JSON.stringify(this.corps[i + 1]))
                    this.corps[i + 1] = temp; 

                } else if(i == this.corps.length -1){

                    this.corps[i] = temp2;

                } else  {

                    temp = JSON.parse(JSON.stringify(this.corps[i]));
                    this.corps[i] = temp2;
                    temp2 = JSON.parse(JSON.stringify(this.corps[i + 1]));
                    this.corps[i + 1] = temp;   
              }    
            }      


        }



    } 

    avancer(code){

        var test;

        if(code == 37){ // gauche

            test = this.collisionCorps(37);
            if (test == 'precedent_mouvement'){

                // continuer la direction précédente
                this.directionSnake(code, -1);

            } else if (test == 'game_over'){

                alert('GAME OVER');
            }

        
        } else if ( code == 39 ){ //droite

            test = this.collisionCorps(39);
            if (test == 'precedent_mouvement'){

                this.directionSnake(code, 1);

            } else if (test == 'game_over'){

                alert('GAME OVER');

            }
    
    
        } else if (code == 38) { // haut

            test = this.collisionCorps(38);
            if (test == 'precedent_mouvement'){

                

            } else if (test == 'game_over'){

                alert('GAME OVER');

            } else {

                this.directionSnake(code, -1);

            }
            
           
        } else if (code == 40) { //bas

            test = this.collisionCorps(40);
            if (test == 'precedent_mouvement'){

               

            } else if (test == 'game_over'){


                alert('GAME OVER');

            } else {

                this.directionSnake(code, 1);

            }
             
        } 

    }

    collisionCorps(code){

        var testTempPositionX;

        if(code == 37){

           testTempPositionX = this.corps[0].positionX - this.width;

           if (testTempPositionX == this.corps[1].positionX){

              return "precedent_mouvement";      

           }
            
        } else if(code == 39){

            testTempPositionX = this.corps[0].positionX + this.width;

            if(testTempPositionX == this.corps[1].positionX){

                return "precedent_mouvement";

            }


        } else if (code == 38){



        } else {


        }

    }

};
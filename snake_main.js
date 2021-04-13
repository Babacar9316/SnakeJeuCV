"use strict";

window.addEventListener('load', function(){

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const jouer = document.getElementById('jouer');
    const com = document.getElementById('commandes');

    class Block {


    constructor(X,Y){

        this.width = 5;
        this.height = 5;
        this.positionX = X;
        this.positionY = Y;
        this.couleur = 'green';

    }
    /*
    draw(){

        ctx.beginPath();
        ctx.fillStyle = this.couleur;
        ctx.fillRect(this.positionX,this.positionY,this.width , this.height);
        ctx.closePath();

    } */


    }

        class Snake extends Block {

            constructor(){

                super();
                this.corps = [];
                this.longueurInit = 10;
                this.positionXtete = canvas.width / 2;
                this.positionYtete = canvas.height /2;
                this.directionInitX = 37 ; //gauche

            }


            init(){

                var decalage = 0;

                for(let i = 0; i < this.longueurInit; i++){

                if(i == 0){

                    this.corps.push(new Block(this.positionXtete, this.positionYtete));
                    decalage = this.positionXtete + this.width;

                } else {

                    this.corps.push(new Block(decalage, this.positionYtete));
                    decalage += this.width;

                }


                }

            }

            dessiner(){


                for (const partie of this.corps){

                    ctx.beginPath();
                    ctx.fillStyle = this.couleur;
                    ctx.fillRect(partie.positionX,partie.positionY,partie.width, partie.height);
                    ctx.closePath();

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


                if(code == 37){ // gauche

                    
                    this.directionSnake(code, -1);


                } else if ( code == 39 ){ //droite


                    this.directionSnake(code, 1);

                
                } else if (code == 38) { // haut


                    this.directionSnake(code, -1);

                
                } else if (code == 40) { //bas


                    this.directionSnake(code, 1);

                    }
                    
                } 


            collisionCorps(code){
            /*
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
            */
            }
        }

        var direction = 37, flagUnefois = false, snake, id;

        var animationJeu = function(){

            ctx.clearRect(0,0,canvas.width,canvas.height);    

                snake.avancer(direction);
                snake.dessiner();

            }


        jouer.addEventListener('click', function(){

                if(!flagUnefois){

                    snake = new Snake();

                    snake.init();
                    snake.dessiner();
                    id = setInterval(animationJeu, 300);
                    flagUnefois = true;

                }
                

            }); 


        com.addEventListener('click', function(){

                clearInterval(id);

            });


        window.addEventListener('keydown', function(event){

                direction = event.keyCode;  

        });


});
 
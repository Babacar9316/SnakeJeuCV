"use strict";

import * as ModuleSnake from "./modules/snake.mjs";
import * as ModuleDom from "./modules/domObject.mjs";

var direction = 37, flagUnefois = false, snake, id;

var animationJeu = function(){

    ModuleDom.ctx.clearRect(0,0,ModuleDom.canvas.width,ModuleDom.canvas.height);    

    snake.avancer(direction);
    snake.dessiner();

}


ModuleDom.jouer.addEventListener('click', function(){

    if(!flagUnefois){

        snake = new ModuleSnake.Snake();

        snake.init();
        snake.dessiner();
        id = setInterval(animationJeu, 300);
        flagUnefois = true;

    }
    

}); 


ModuleDom.com.addEventListener('click', function(){

    clearInterval(id);

});


window.addEventListener('keydown', function(event){

     direction = event.keyCode;  

});





"use strict";

import * as ModuleDom from "./domObject.mjs";

export class Block {


    constructor(X,Y){

        this.width = 5;
        this.height = 5;
        this.positionX = X;
        this.positionY = Y;
        this.couleur = 'green';

    }

    draw(){

        ModuleDom.ctx.beginPath();
        ModuleDom.ctx.fillStyle = this.couleur;
        ModuleDom.ctx.fillRect(this.positionX,this.positionY,this.width , this.height);
        ModuleDom.ctx.closePath();

    }


}
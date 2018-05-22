import { Component, OnInit } from '@angular/core';

@Component({
 selector: 'app-cards',
 templateUrl: './cards.component.html',
 styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
 images = [
  {id:1, url: "/assets/images/10.png"},
  {id:2, url: "/assets/images/J.png"},
  {id:3, url: "/assets/images/K.png"},
  {id:4, url: "/assets/images/Q.png"}
 ];
 images_inact = "/assets/images/poker.png";
 cards = [];
 last_select_id = null;
 aciertos = 4;
 count_aciertos = 0;
 intentos = 10;
 cont_intentos = 0;

 constructor() {}

 ngOnInit() {
  let count_index = 0;
  for(let i = 0; i < this.aciertos * 2; i++){
   if(count_index == this.aciertos){
    count_index = 0;
   }
   let img = this.images[count_index];
   this.cards.push({
    id: img.id, 
    url: img.url, 
    visible: false, //si la imagen se muestra
    active: true //seleccionable
   });
   count_index++;
  }
 }
 card_selected(idx){
  if(!this.cards[idx].active){
   return;
  }
  this.cards[idx].visible = true;

  if(this.last_select_id == null){
   this.last_select_id = idx;
   this.cards[idx].visible = true;
   this.cards[idx].active = false;
  }else{
   if(this.cards[this.last_select_id].id == this.cards[idx].id){ //aumentar aciertos si coinciden
    this.count_aciertos++;
    this.cards[idx].visible = true;
    this.cards[idx].active = false;
    this.last_select_id = null;
   }else{ //no hacen match

    let _this = this;
    setTimeout(function(){
     _this.cards[_this.last_select_id].visible = false; //ocultar 
     _this.cards[_this.last_select_id].active = true; //activar
     _this.cards[idx].visible = false;
     _this.last_select_id = null;
    },0.2*1000)

   }
  }
  if(this.aciertos == this.count_aciertos){
   alert("Juego Terminado");
   window.location.reload();
  }
  if(this.cont_intentos == this.intentos - 1){
   alert("Perdiste");
   window.location.reload();
  }
  this.cont_intentos++;
  
 }
}
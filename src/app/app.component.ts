import { Component } from '@angular/core';
import { MovesService } from './moves.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MovesService]
})
export class AppComponent {

  moves;

  constructor(private myService: MovesService) {}

  ngOnInit() {
    this.myService.getMoves()
      .subscribe(res => this.moves = res);
  }

  interval;
  title = 'juego';
  public change_level_at = 40
  public stateTitle = ['Iniciar Juego', 'Tirar Dados','Ver Dados','Ver Prueba','Iniciar Prueba',
  'Haciendo cosas malas!','Cambio de Turno!'];

  public players = ["Nataly", "Alberto"]
  public game = {
    round: 0,
    turno:0,
    state: 0,
    sex_level: 1,
    drugs_level:1,
    die_result: 0,
    change_level_at: 3,
    dice_recorded: [],
    current_move: null,
    extras_player_1: null,
    extras_player_2: null,
    current_timer: 0
  }
  public current_extra_selected = null

  public advance(){



    if(this.game.state == 6){
      this.game.state = 1
      this.game.turno = (this.game.turno + 1) % 2
      this.game.round++
      if(this.game.round % this.game.change_level_at == 0 && this.game.round > 0){
        this.game.sex_level++
        this.showChangeLevel()
      }
    }else{
      this.game.state++
    }
    switch (this.game.state) {
      case 2:
        this.game.die_result = this.getDieResult()
        this.game.dice_recorded.push(this.game.die_result)
        this.game.current_move = this.moves[this.game.die_result]
        if(this.game.dice_recorded.length >= this.moves.length) this.game.dice_recorded = []
        break;
      case 4:
        this.showTimer()
      default:
        break;
    }
      console.log('advance state = ' + JSON.stringify(this.moves))
  }

  public showTimer(){

          if(this.current_extra_selected != null){
            this.game.current_timer = this.game.current_move.time * this.current_extra_selected
          }else{
            this.game.current_timer = this.game.current_move.time
          }
          const timer = this.game.current_timer
          const source = interval(1000);
          const subscribe = source.subscribe(val => {
            console.log(val)
            this.game.current_timer --
            if(val >= timer){
              subscribe.unsubscribe()
              this.advance()
            }
          }
          );


  }


  public getDieResult(){
    let die = Math.floor(Math.random() * this.moves.length)
    let matchs = true
    while(matchs){
      matchs = false
        for(var i=0; i < this.game.dice_recorded.length; i++){
          if(this.game.dice_recorded[i] == die){
            matchs = true
            die = Math.floor(Math.random() * this.moves.length)
            break
          }
        }
    }
     return die;
  }

  public showChangeLevel(){

    console.log('shoeeeeee change level')
  }
}

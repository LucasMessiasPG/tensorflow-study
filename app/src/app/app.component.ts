import { Component, HostListener } from '@angular/core';
import SetupNN from "./nn/setup";
import Game from './_base/game';

@Component({
  selector: 'app-root',
  templateUrl: "app.html",
  styleUrls: ["app.scss"]
})
export class AppComponent {
  title = 'app';
  game: Game;
  setup: SetupNN;
  constructor(){
    let setup = new SetupNN(15)
    this.game = setup.game;
    this.setup = setup;
  }
}

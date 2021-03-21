import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { COORDINATE, Game, Planet, Player, Ship } from '../definitions';
import { PlaymapService } from '../playmap.service';

@Component({
  selector: 'app-playmap',
  templateUrl: './playmap.component.html',
  styleUrls: ['./playmap.component.scss']
})
export class PlaymapComponent implements OnInit {
  readonly trajectoriesObs: Observable<string[]>;
  readonly gameObs: Observable<Game>;

  constructor(private GS: PlaymapService) {
    this.gameObs         = this.GS.gameObs;
    this.trajectoriesObs = this.GS.trajectoriesObs.pipe(
      map( LLC => LLC.map( LC => LC.map(c => c.join()).join(' ') ) )
    );
  }

  ngOnInit(): void {
  }


  get color() : string[]{
    return this.GS.colors;
  }

  dragPlanet(planet : Planet, domMatrix : DOMMatrix) {
    this.GS.updatePlanet(planet, {p : [planet.p[0] + domMatrix.e, planet.p[1] + domMatrix.f]});
  }

  dragShip(ship : Ship, domMatrix : DOMMatrix) {
    this.GS.updateShip(ship, {p : [ship.p[0] + domMatrix.e, ship.p[1] + domMatrix.f]});
  }

  start() {
    this.GS.start();
  }

  stop() {
    this.GS.stop();
  }

  load() {
    this.GS.load();
  }

  /*updateAngleForce(angle : number, force : number) {
    this.GS.updateShip()
  }*/

}

import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  readonly selectedShipSubj = new BehaviorSubject<Ship | undefined>(undefined);

  constructor(private GS: PlaymapService) {
    this.gameObs         = this.GS.gameObs;
    this.trajectoriesObs = this.GS.trajectoriesObs.pipe(
      map( LLC => LLC.map( LC => LC.map(c => c.join()).join(' ') ) )
    );
  }

  ngOnInit(): void {
  }

  endDragPlanet(P: Planet, M: DOMMatrix): void {
    // console.log('endDragPlanet', P, M);
    const pt0 = new DOMPoint(0, 0);
    const pt = pt0.matrixTransform(M);
    this.GS.updatePlanet(P, {p: [P.p[0] + pt.x, P.p[1] + pt.y].map(
      x => Math.round(1000 * x) / 1000
    ) as COORDINATE });
  }

  load(): void {
    this.GS.load();
  }

  start(): void {
    this.GS.start();
  }

  stop(): void {
    this.GS.stop();
  }

  get colors(): string[] {
    return this.GS.colors;
  }

}

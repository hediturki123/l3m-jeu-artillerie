import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { COORDINATE, Game, PhysicalObject, Planet, Player, Ship } from '../definitions';
import { PlaymapService } from '../playmap.service';

@Component({
  selector: 'app-playmap',
  templateUrl: './playmap.component.html',
  styleUrls: ['./playmap.component.scss']
})
export class PlaymapComponent implements OnInit {
  readonly trajectoriesObs: Observable<string[]>;
  readonly gameObs: Observable<Game>;
  readonly selectedShipUIDSubj = new BehaviorSubject<number>(-1);
  readonly selectedShipObs: Observable<Ship | undefined>;

  constructor(private GS: PlaymapService) {
    this.gameObs         = this.GS.gameObs;
    this.trajectoriesObs = this.GS.trajectoriesObs.pipe(
      map( LLC => LLC.map( LC => LC.map(c => c.join()).join(' ') ) )
    );
    this.selectedShipObs = combineLatest([this.gameObs, this.selectedShipUIDSubj]).pipe(
      map( ([G, uid]) => G.players.reduce( (L, S) => [...L, ...S.ships], [] as Ship[])
                                  .find( S => S.uid === uid)
         )
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

  isSelected(S: Ship): boolean {
    return S.uid === this.selectedShipUIDSubj.value;
  }

  updateShipFire(S: Ship, p: {angle: number, force: number}): void {
    this.GS.updateShip(S, p);
  }

  trackByUID(i: number, e: PhysicalObject): number {
    return e.uid;
  }

  trackByIndex(i: number): number {
    return i;
  }

}

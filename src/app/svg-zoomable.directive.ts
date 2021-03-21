import { AfterViewInit, OnInit } from '@angular/core';
import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[appSvgZoomable]'
})
export class SvgZoomableDirective implements OnInit, OnDestroy, AfterViewInit {
  @Input () appSvgZoomable: boolean | Element = true;

  private sub: Subscription | undefined = undefined;
  private svg: Element | null = null;

  constructor(private el: ElementRef<SVGGraphicsElement>) { }

  ngOnInit(): void {
    const src = typeof this.appSvgZoomable === 'boolean' ? this.el.nativeElement : this.appSvgZoomable;
    const wheelEvt = fromEvent<WheelEvent>( src, 'wheel' );
    this.sub = wheelEvt.subscribe( {next: evt => {
      evt.preventDefault();
      evt.stopPropagation();
      const z = evt.deltaY > 0 ? 0.9 : (1 / 0.9);
      const [x, y] = this.getCoordFromEvent(evt);
      // console.log(x, y);
      const M = (this.el.nativeElement.getCTM() as DOMMatrix)
                .translate( x - x * z, y - y * z )
                .scale(z);
      this.el.nativeElement.setAttribute(
        'transform',
        `matrix(${M.a}, ${M.b}, ${M.c}, ${M.d}, ${M.e}, ${M.f})`
      );
    } });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.svg = this.el.nativeElement;
    while (this.svg && this.svg.tagName.toUpperCase() !== 'SVG') {
      this.svg = this.svg.parentElement;
    }
  }

  private getCoordFromEvent(evt: WheelEvent): [number, number] {
    const box = this.svg?.getBoundingClientRect() as DOMRect;
    const M = this.el.nativeElement.getCTM();
    // console.log(box, this.svg);
    const pt = (new DOMPoint(
      evt.pageX + window.scrollX - box.x,
      evt.pageY + window.scrollY - box.y
    ) ).matrixTransform( M?.inverse() );
    return [pt.x, pt.y];
  }

}

import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[gamesBorderCard]'
})
export class GamesDirective {

  constructor(private element: ElementRef) {
    this.setBorder('black')
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder('#f2cc8f')
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder('black')
  }

  private setBorder(color: string) {
    this.element.nativeElement.style.border = 'solid 1px ' + color;
  }
}

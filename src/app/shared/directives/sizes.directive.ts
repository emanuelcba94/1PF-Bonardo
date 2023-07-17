import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSizes]'
})
export class SizesDirective {

  @Input()
  appSizes = '25px';

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) { 
    this.renderer2.setStyle(this.elementRef.nativeElement, 'font-size', this.appSizes);
  }
    
}

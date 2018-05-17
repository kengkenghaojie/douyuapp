import { Directive, ElementRef, AfterViewInit, Renderer2,Input } from '@angular/core';

/**
 * Generated class for the ErrorImgDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[error-img]', // Attribute selector
  host: {
    '(error)': 'onError($event.target)'
  }
})
export class ErrorImgDirective implements AfterViewInit {

  @Input('error-img') errorImagSrc: string;
  private image = './assets/images/list-item-def-thumb.gif';

  constructor(
    private er: ElementRef,
    private renderer2: Renderer2
  ) {

    console.log('Hello ErrorImgDirective Directive');
  }
  ngAfterViewInit() {

    this.renderer2.addClass(this.er.nativeElement, 'haojie111111');

  }
  onError(e) {
    e.src = this.image;
  }


}

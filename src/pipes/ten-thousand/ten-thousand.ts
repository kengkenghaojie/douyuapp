import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TenThousandPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'tenThousand',
})
export class TenThousandPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number, ...args) {
    if(value > 10000){
      let result = (value / 10000).toFixed(0);
      return result;
    }else {
      return value;
    }
  }
}

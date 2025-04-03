import {Pipe, PipeTransform} from '@angular/core';
import {DateTime} from 'luxon';

@Pipe({
  name: 'luxonDate',
  standalone: true
})
export class LuxonDatePipe implements PipeTransform {
  transform(value: DateTime | null | undefined): string {
    if (!value ) {
      return '';
    }

    let temp = DateTime.fromISO(value.toString() , {zone: 'Africa/Nairobi'} );

    if( temp.isValid ){
      return temp.toLocaleString(DateTime.DATETIME_SHORT)
    }else {
      return value.toString()
    }
  }
}

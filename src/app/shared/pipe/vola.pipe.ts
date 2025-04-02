import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'vola',
  standalone: true
})
export class VolaPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {}

  transform(value: number): string {
    const formatted = this.currencyPipe.transform(value, 'MGA', 'symbol');
    return formatted ? formatted.replace('MGA', 'MGA ') : '';
  }
}

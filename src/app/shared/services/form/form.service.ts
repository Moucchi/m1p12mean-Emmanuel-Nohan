import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  isFieldInvalid(field: string, formGroup: FormGroup) {
    const formControl = formGroup.get(field);
    return formControl?.invalid && (formControl.dirty || formControl?.touched);
  }

  clearFields(formGroup: FormGroup) {
    formGroup.reset();
  }

  fieldsMatch(field1: string, field2: string, formGroup: FormGroup): boolean {
    const value1 = formGroup.get(field1)?.value;
    const value2 = formGroup.get(field2)?.value;
    return value1 === value2;
  }

  submitForm(event: Event, formGroup: FormGroup) {
    event.preventDefault();
    console.log(formGroup.value);
  }
}

import {Injectable} from '@angular/core';
import {DateTime} from 'luxon';
import {AbstractControl, ValidationErrors} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormFieldValidatorsService {
  validateDate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const date = DateTime.fromISO(value);

    if (!date.isValid) {
      return {invalidDate: true};
    }

    const today = DateTime.now();
    const minDate = today.minus({years: 60});
    const maxDate = today.minus({years: 18});

    if (date.toMillis() > maxDate.toMillis() || date.toMillis() < minDate.toMillis()) {
      return {ageInvalid: true};
    }

    return null;
  }

  validateAppointmentDate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const date = DateTime.fromISO(value);

    if (!date.isValid) {
      return {invalidDate: true};
    }

    const now = DateTime.now().startOf('day');
    const appointmentDate = date.startOf('day');

    if (appointmentDate < now) {
      return {pastDate: true};
    }

    return null;
  }

  validateImageFile(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const file = control.value as File;

    if (!(file instanceof File)) {
      return {invalidFile: true};
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return {invalidType: true};
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return {oversizedFile: true};
    }

    return null;
  }
}

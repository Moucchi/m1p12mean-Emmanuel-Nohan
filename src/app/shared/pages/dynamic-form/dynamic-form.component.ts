import {Component, inject} from '@angular/core';
import {
  FormBuilder,
  FormArray,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors, FormsModule
} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {FormFieldValidatorsService} from '../../services/form/form-field-validators.service';
import {QuillEditorComponent} from 'ngx-quill';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    QuillEditorComponent,
    FormsModule
  ],
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly formValidator = inject(FormFieldValidatorsService);

  form = this.formBuilder.group({
    files: [[] as File[], [Validators.required, this.validateMultipleFiles.bind(this)]],
    report: ['', Validators.required],
    items: this.formBuilder.array([])
  });

  content = '';

  get itemsArray() {
    return this.form.get('items') as FormArray;
  }

  removeItem(index: number): void {
    this.itemsArray.removeAt(index);
  }

  validateMultipleFiles(control: AbstractControl): ValidationErrors | null {
    const files = control.value as File[];
    if (!files || files.length === 0) return null;

    for (const file of files) {
      if (!(file instanceof File)) {
        return {invalidFile: true};
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        return {invalidType: true};
      }

      const maxSize = 5 * 1024 * 1024; // 5 MB
      if (file.size > maxSize) {
        return {oversizedFile: true};
      }
    }

    return null;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.form.get('files')?.setValue(Array.from(input.files));
      this.form.get('files')?.updateValueAndValidity();

      console.log("Type de input.files:", Object.prototype.toString.call(input.files));
      console.log("Contenu de input.files:", input.files);
    }
  }

  generateItem() {
    return this.formBuilder.group({
      id: [this.generateItemId()],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  generateItemId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  addInputExtra(): void {
    this.itemsArray.push(this.generateItem());
  }

  onSubmit(): void {

    console.log(`Form : ${this.form.getRawValue()}`);
  }

}

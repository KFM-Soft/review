import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators, FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
@Component({
  selector: 'app-empresa-form',
  standalone: true,
  templateUrl: './empresa-form.component.html',
  imports: [NzFormModule, NzInputModule, FormsModule]
})
export class EmpresaFormComponent {
  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }

  constructor(private fb: NonNullableFormBuilder) {}
}

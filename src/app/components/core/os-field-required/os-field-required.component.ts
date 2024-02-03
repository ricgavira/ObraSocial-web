import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'os-field-required',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './os-field-required.component.html',
  styleUrl: './os-field-required.component.scss'
})
export class OsFieldRequiredComponent implements OnInit{
@Input() osFormGroup: FormGroup | undefined;
@Input() osLabel: string = '';
@Input() osClassName: string = '';
@Input() osPlaceholder: string = '';
@Input() osFieldName: string = '';
@Input() osControl!: any;

ngOnInit(): void {  
  console.log(this.osClassName);
}

isInvalid(): boolean {
    if (this.osFormGroup != undefined) {
      const formControl: any = this.osFormGroup.get(this.osFieldName);

      if (formControl?.errors != null) {
        return formControl.errors['Required'] && formControl.touched;
      }
    }
    return false;
  }
}

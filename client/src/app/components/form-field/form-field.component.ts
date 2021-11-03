import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent implements OnInit {

  @Input()public label!: string;
  @Input()public requiredError!: string;
  public invalidError: string = 'Please enter valid data.';
  @Input()public placeholder!: string;
  @Input()public maxlength!: string;
  @Input()public type: string = 'text';
  @Input()public selectOptionMap: any;
  public selectOptionKeys!: any[];
  public required: boolean = false;

  // for form controls
  @Input()public parentFG!: FormGroup;
  @Input()public controlName!: string;
  public control!: AbstractControl;
  @Input()public endDateControlName!: string;

  public constructor() { }

  public ngOnInit(): void {
    this.control = this.parentFG.get(this.controlName) as AbstractControl;

    // prepare the select options
    if (this.type == 'select') {
      this.selectOptionKeys = Object.keys(this.selectOptionMap);
    }

    // check if required validator
    if (!!this.control.validator) {
      const validators = this.control.validator({} as AbstractControl);
      this.required = !!validators && !!validators.required;
    }

    // update the invalid error for date fields
    if (this.type == 'date' || this.type == 'daterange') {
      this.invalidError = 'Please use MM/DD/YYYY format.';
    }
  }

  public ngOnChanges() {
    // prepare the select options
    if (this.type == 'select') {
      this.selectOptionKeys = Object.keys(this.selectOptionMap);
    }
  }

}

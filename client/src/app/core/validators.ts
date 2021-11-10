import {AbstractControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
export const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,18}\b([-a-zA-Z0-9()@:%_+.~#?&\/=,!$\\'*;]*)$/;
export const emailRegex = /^(\w[\w-.+]*@(\w[\w-]*\.)+[\w-]{2,12})?$/;

export class CustomValidators extends Validators {

  public static phone = Validators.pattern(/^\+?[\d\-\s()/]{6,25}$/);

  public static mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  public static override email(control: AbstractControl): ValidationErrors | null {
    if (CustomValidators.isEmptyInputValue(control.value.trim())) {
      return null;
    }
    return emailRegex.test(control.value.trim()) ? null : {'email': true};
  }

  private static isEmptyInputValue(value: any): boolean {
    return value == null || value.length === 0;
  }

}

import { FormGroup } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        if (control.value !== matchingControl.value) {
            console.log('not matching');
            matchingControl.setErrors({ mustMatch: true });
        } else {
            console.log('matching');
            matchingControl.setErrors(null);
        }
    }
}
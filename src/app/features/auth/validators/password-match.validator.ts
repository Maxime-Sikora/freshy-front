// validators/password-match.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(passKey: string, confirmKey: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get(passKey);
    const confirm = group.get(confirmKey);

    if (!pass || !confirm) return null;

    // si les valeurs ne correspondent pas
    if (pass.value !== confirm.value) {
      confirm.setErrors({ ...(confirm.errors ?? {}), passwordMismatch: true });
    } else {
      // si elles correspondent, on enlève uniquement passwordMismatch
      if (confirm.errors) {
        const rest = { ...confirm.errors };
        delete rest['passwordMismatch'];
        confirm.setErrors(Object.keys(rest).length ? rest : null);
      }
    }

    return null; // pas d'erreur au niveau du FormGroup
  };
}

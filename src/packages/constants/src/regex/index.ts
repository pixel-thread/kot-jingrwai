// Special characters
export const specialCharsRegx = /[!@#$%^&*(),.?":{}|<>_\-\\[\]`~+=;/]/;

// Only letters
export const textOnlyRegx = /^[a-zA-Z ]+$/;

// Only numbers
export const numericRegx = /[0-9]/;
// Only numbers
export const numericOnlyRegx = /^[0-9]+$/;

// Contains at least one lowercase letter
export const lowerCaseRegx = /[a-z]/;

// Contains at least one uppercase letter
export const upperCaseRegx = /[A-Z]/;

// App version format (e.g. 1.0.0)
export const appVersionRegx = /^\d+\.\d+\.\d+$/;

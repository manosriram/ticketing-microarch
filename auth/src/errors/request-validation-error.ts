import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
    constructor(public errors: ValidationError[]) {
        super();

        // Just because 'Error' is a built-in class.
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
};

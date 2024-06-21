import CustomError from "./customError";

export default class ValidationError extends CustomError {
    constructor(message: string) {
        super(400, message);
    }
}
import CustomError from "./customError";

export default class UnauthorizedError extends CustomError {
    constructor(message: string = "Unauthorized: Access token is missing") {
        super(401, message);
    }
}
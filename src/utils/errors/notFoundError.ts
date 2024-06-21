import CustomError from "./customError";

export default class NotFoundError extends CustomError {
    constructor(message: string = "Not Found") {
        super(404, message);
    }
}

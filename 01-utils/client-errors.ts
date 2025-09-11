import StatusCode from "./status-code";

// Base client error:
abstract class ClientError {

    public status: number;
    public message: string;

    public constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }
}

// Route not found error: 
export class RouteNotFoundError extends ClientError {
    public constructor(route: string) {
        super(StatusCode.NotFound, `Route ${route} not found`);
    }
}

// Resource not found error: if DB item doesn't exist:
export class ResourceNotFoundError extends ClientError {
    public constructor(id: number | string) {
        super(StatusCode.NotFound, `Wanted id ${id} wasn't found`);
    }
}

// Validation error: 
export class ValidationError extends ClientError {
    public constructor(message: string) {
        super(StatusCode.BadRequest, message);
    }
}

// Unauthorized error: when user is unknown (before login)
export class UnauthorizedError extends ClientError {
    constructor(message: string) {
        super(StatusCode.Unauthorized, message);
    }
}

// Forbidden error: when user is known (after login) but not authorized
export class ForbiddenError extends ClientError {
    constructor(message: string) {
        super(StatusCode.Forbidden, message);
    }
}

export class CustomError extends ClientError {
    constructor(status: StatusCode, message?: string) {
        super(status, message);
    }
}

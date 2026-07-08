"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../erros/ApiError"));
// Import your custom ApiError
const globalErrorHandler = (err, req, res, next) => {
    // Declare statusCode as 'number' to allow other status codes like 400, 404, etc.
    let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    let success = false;
    let message = err.message || "Something went wrong!";
    let error = err;
    // Handle Prisma validation errors
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        message = "Validation Error";
        error = err.message;
    }
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            // Handle unique constraint violation (e.g., duplicate email)
            message =
                "Duplicate field error. The provided value for a unique field already exists.";
            error = err.meta?.target; // Specify which field caused the conflict
            statusCode = http_status_1.default.BAD_REQUEST; // Return a 400 (Bad Request)
        }
    }
    // Handle custom ApiError
    if (err instanceof ApiError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        error = err.stack;
    }
    res.status(statusCode).json({
        success,
        message,
        error,
    });
};
exports.default = globalErrorHandler;
